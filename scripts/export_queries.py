"""Write the 25 queries to database/consultas.js for mongosh or Compass.

Usage:  .venv/bin/python -m scripts.export_queries
"""
import textwrap
from pathlib import Path

from app.modules.queries.catalog import QUERIES
from app.modules.queries.service import code_of

OUTPUT = Path(__file__).resolve().parent.parent / "database" / "consultas.js"


def main() -> None:
    lines = ["// Consultas sobre la base de datos autos (Aggregation Framework)",
             "// Generado por scripts/export_queries.py desde app/modules/queries/catalog.py",
             "", 'db = db.getSiblingDB("autos");', ""]
    for query in QUERIES:
        lines.append(f"// {query.number}. " + "\n//    ".join(textwrap.wrap(query.statement, 88)))
        lines += [code_of(query), ""]
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"{len(QUERIES)} consultas en {OUTPUT.name}")


if __name__ == "__main__":
    main()
