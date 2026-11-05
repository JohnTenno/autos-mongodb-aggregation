import json
from pathlib import Path

from app.database import config
from app.modules.cars.cars_service import CarsService
from app.modules.continents.continents_service import ContinentsService
from app.modules.makers.makers_service import MakersService

OUTPUT = Path(__file__).resolve().parent.parent / "database" / "queries.js"


def main() -> None:
    services = {"cars": CarsService(), "makers": MakersService(),
                "continents": ContinentsService()}
    lines = [f"db = db.getSiblingDB({json.dumps(config.db_name)});", ""]
    for number in range(1, 26):
        for collection, service in services.items():
            method = getattr(service, f"query{number}", None)
            if method:
                pipeline, _ = method()
                lines.append("// " + " ".join(method.__doc__.split()))
                lines.append(f"db.{collection}.aggregate("
                             f"{json.dumps(pipeline, ensure_ascii=False, indent=2)});")
                lines.append("")
    OUTPUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"Queries written to {OUTPUT.name}")


if __name__ == "__main__":
    main()
