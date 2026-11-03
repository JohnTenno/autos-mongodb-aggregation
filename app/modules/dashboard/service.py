"""Overview of the migrated database."""
from app.core.schema import COLLECTIONS

from . import repository
from .dto import CollectionStatsDto

# Which relational tables ended up in each collection, and how.
ORIGINS = {
    "continents": ("Continents + Countries", "Países embebidos (1:N)"),
    "makers": ("Car_Makers + Model_Details",
               "País embebido como referencia extendida; marcas embebidas (1:N)"),
    "cars": ("Car_Names + Car_Details",
             "Especificaciones embebidas (1:1); fabricante enlazado por makerId"),
}


def collection_stats() -> list[CollectionStatsDto]:
    rows = []
    for name in COLLECTIONS:
        stats = repository.stats(name)
        source, design = ORIGINS[name]
        rows.append(CollectionStatsDto(
            name=name, source=source, design=design,
            documents=stats.get("count", 0), indexes=stats.get("nindexes", 0),
            size_kb=round(stats.get("size", 0) / 1024, 1)))
    return rows
