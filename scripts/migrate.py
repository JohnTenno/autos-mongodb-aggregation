import json
import re
import sys
from collections import defaultdict
from dataclasses import asdict
from pathlib import Path

from app.config import Config
from app.database import get_db
from app.modules.cars.schemas.car_schema import CAR_INDEXES, Car, CarModel, Details
from app.modules.continents.schemas.continent_schema import CONTINENT_INDEXES, Continent, Country
from app.modules.makers.schemas.maker_schema import (MAKER_INDEXES, Maker, MakerContinent,
                                                     MakerCountry, MakerModel)

ROOT = Path(__file__).resolve().parent.parent
DEFAULT_SQL = ROOT / "docs" / "BDAutosU2.sql"
JS_OUTPUT = ROOT / "database" / "autos_mongodb.js"

COLLECTIONS = [
    ("continents", CONTINENT_INDEXES),
    ("makers", MAKER_INDEXES),
    ("cars", CAR_INDEXES),
]

INSERT = re.compile(r"INSERT INTO (\w+) VALUES\s*\((.*)\);", re.IGNORECASE)
VALUE = re.compile(r"'((?:[^']|'')*)'|(-?\d+(?:\.\d+)?)|(NULL)", re.IGNORECASE)

EXPECTED = {"CONTINENTS": 5, "COUNTRIES": 17, "CAR_MAKERS": 20,
            "MODEL_DETAILS": 42, "CAR_NAMES": 138, "CAR_DETAILS": 138}


def read_tables(sql: str) -> dict[str, list[tuple]]:
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
    return int(value) if isinstance(value, float) and value.is_integer() else value


def build_documents(tables: dict[str, list[tuple]]) -> dict[str, list]:
    continents = {cid: Continent(cid, name, []) for cid, name in tables["CONTINENTS"]}
    countries = {}
    for country_id, name, cont_id in tables["COUNTRIES"]:
        continent = continents[cont_id]
        continent.countries.append(Country(country_id, name))
        countries[country_id] = MakerCountry(country_id, name,
                                             MakerContinent(cont_id, continent.name))

    makers = {mid: Maker(mid, name, full, countries[country_id], [])
              for mid, name, full, country_id in tables["CAR_MAKERS"]}
    models = {}
    for model_id, maker_id, name in tables["MODEL_DETAILS"]:
        makers[maker_id].models.append(MakerModel(model_id, name))
        models[model_id] = (name, maker_id)

    details = {row[0]: row[1:] for row in tables["CAR_DETAILS"]}
    cars = []
    for car_id, model_id, descr in tables["CAR_NAMES"]:
        name, maker_id = models[model_id]
        cars.append(Car(car_id, descr, CarModel(model_id, name), maker_id,
                        Details(*map(number, details[car_id]))))

    return {"continents": list(continents.values()),
            "makers": list(makers.values()),
            "cars": cars}


def load(documents: dict[str, list]) -> None:
    db = get_db()
    for name, indexes in COLLECTIONS:
        db.drop_collection(name)
        db[name].insert_many([asdict(document) for document in documents[name]])
        for keys, options in indexes:
            db[name].create_index(list(keys.items()), **options)


def to_json(value) -> str:
    return json.dumps(value, ensure_ascii=False, indent=2)


def write_script(documents: dict[str, list], db_name: str) -> None:
    lines = [
        f"db = db.getSiblingDB({json.dumps(db_name)});",
        "",
    ]
    for name, indexes in COLLECTIONS:
        lines.append(f"db.{name}.drop();")
        lines.append(f"db.{name}.insertMany({to_json([asdict(d) for d in documents[name]])});")
        for keys, options in indexes:
            lines.append(f"db.{name}.createIndex({to_json(keys)}, {to_json(options)});")
        lines.append("")
    JS_OUTPUT.parent.mkdir(exist_ok=True)
    JS_OUTPUT.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> None:
    sql_path = Path(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_SQL
    tables = read_tables(sql_path.read_text(encoding="utf-8"))
    for table, count in EXPECTED.items():
        assert len(tables[table]) == count, f"{table}: {len(tables[table])} rows, expected {count}"

    documents = build_documents(tables)
    assert sum(len(maker.models) for maker in documents["makers"]) == 42

    config = Config.from_env()
    write_script(documents, config.db_name)
    load(documents)
    print(f"{config.db_target}: " + ", ".join(
        f"{len(documents[name])} {name}" for name, _ in COLLECTIONS))
    print(f"mongosh script: {JS_OUTPUT.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
