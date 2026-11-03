"""Migrate BDAutosU2 (Oracle script) into the autos MongoDB database.

Usage:  .venv/bin/python -m scripts.migrate [ruta/al/BDAutosU2.sql]

Reads the INSERT statements of the relational script, builds the documents
described in app/core/schema.py, recreates the collections with their
validators and indexes, loads the data and writes database/autos_mongodb.js
(the same database as a mongosh script, for Compass or mongosh).
"""
import re
import sys
from collections import defaultdict
from pathlib import Path

from app.config import Config
from app.core import mongosh
from app.core.database import connect
from app.core.schema import COLLECTIONS, INDEXES, VALIDATORS

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SQL = ROOT / "docs" / "BDAutosU2.sql"
JS_OUTPUT = ROOT / "database" / "autos_mongodb.js"

INSERT = re.compile(r"INSERT INTO (\w+) VALUES\s*\((.*)\);", re.IGNORECASE)
VALUE = re.compile(r"'((?:[^']|'')*)'|(-?\d+(?:\.\d+)?)|(NULL)", re.IGNORECASE)

EXPECTED = {"CONTINENTS": 5, "COUNTRIES": 17, "CAR_MAKERS": 20,
            "MODEL_DETAILS": 42, "CAR_NAMES": 138, "CAR_DETAILS": 138}


def read_tables(sql: str) -> dict[str, list[tuple]]:
    """Every INSERT as a tuple of Python values, grouped by table."""
    tables = defaultdict(list)
    for match in INSERT.finditer(sql):
        values = []
        for text, number, null in VALUE.findall(match.group(2)):
            if null:
                values.append(None)
            elif number:
                values.append(float(number) if "." in number else int(number))
            else:
                values.append(text.replace("''", "'"))
        tables[match.group(1).upper()].append(tuple(values))
    return tables


def number(value):
    """5.0 -> 5 so whole numbers are stored as int, like NUMBER(10)."""
    return int(value) if isinstance(value, float) and value.is_integer() else value


def build_documents(tables: dict[str, list[tuple]]) -> dict[str, list[dict]]:
    continents = {cid: {"_id": cid, "name": name, "countries": []}
                  for cid, name in tables["CONTINENTS"]}
    countries = {}
    for country_id, name, cont_id in tables["COUNTRIES"]:
        continents[cont_id]["countries"].append({"_id": country_id, "name": name})
        countries[country_id] = {
            "_id": country_id, "name": name,
            "continent": {"_id": cont_id, "name": continents[cont_id]["name"]},
        }

    makers = {mid: {"_id": mid, "name": name, "fullName": full,
                    "country": countries[country_id], "models": []}
              for mid, name, full, country_id in tables["CAR_MAKERS"]}
    models = {}
    for model_id, maker_id, name in tables["MODEL_DETAILS"]:
        makers[maker_id]["models"].append({"_id": model_id, "name": name})
        models[model_id] = {"_id": model_id, "name": name, "makerId": maker_id}

    details = {row[0]: row[1:] for row in tables["CAR_DETAILS"]}
    cars = []
    for car_id, model_id, descr in tables["CAR_NAMES"]:
        mpg, cylinders, edispl, horsepower, weight, accel, year = map(number, details[car_id])
        model = models[model_id]
        cars.append({
            "_id": car_id,
            "descr": descr,
            "model": {"_id": model["_id"], "name": model["name"]},
            "makerId": model["makerId"],
            "details": {"mpg": mpg, "cylinders": cylinders, "edispl": edispl,
                        "horsepower": horsepower, "weight": weight,
                        "accel": accel, "year": year},
        })

    return {"continents": list(continents.values()),
            "makers": list(makers.values()),
            "cars": cars}


def load(documents: dict[str, list[dict]], config: Config) -> None:
    db = connect(config.mongo_uri)[config.db_name]
    for name in COLLECTIONS:
        db.drop_collection(name)
        db.create_collection(name, validator={"$jsonSchema": VALIDATORS[name]})
        db[name].insert_many(documents[name])
    for collection, keys, options in INDEXES:
        db[collection].create_index(keys, **options)


def write_script(documents: dict[str, list[dict]], db_name: str) -> None:
    lines = [
        "// Base de datos autos (BDAutosU2 migrada a MongoDB)",
        "// Generado por scripts/migrate.py. Se ejecuta en mongosh o en la pestaña",
        "// MONGOSH de Compass:  load(\"database/autos_mongodb.js\")",
        "",
        f"db = db.getSiblingDB({mongosh.to_js(db_name)});",
        "",
    ]
    for name in COLLECTIONS:
        lines.append(f"db.{name}.drop();")
        lines.append(f"db.createCollection({mongosh.to_js(name)}, "
                     f"{mongosh.to_js({'validator': {'$jsonSchema': VALIDATORS[name]}})});")
        lines.append(mongosh.call(name, "insertMany", documents[name], width=110) + ";")
        lines.append("")
    for collection, keys, options in INDEXES:
        lines.append(mongosh.call(collection, "createIndex", dict(keys), options) + ";")
    JS_OUTPUT.parent.mkdir(exist_ok=True)
    JS_OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    sql_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SQL
    tables = read_tables(sql_path.read_text(encoding="utf-8"))
    for table, count in EXPECTED.items():
        assert len(tables[table]) == count, f"{table}: {len(tables[table])} filas, se esperaban {count}"

    documents = build_documents(tables)
    assert sum(len(m["models"]) for m in documents["makers"]) == 42
    assert all(len(car["details"]) == 7 for car in documents["cars"])

    config = Config.from_env()
    write_script(documents, config.db_name)
    load(documents, config)
    print(f"{config.db_target}: " + ", ".join(
        f"{len(documents[n])} {n}" for n in COLLECTIONS))
    print(f"Script mongosh: {JS_OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
