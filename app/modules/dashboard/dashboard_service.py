from app.database import get_db

COLLECTIONS = {
    "continents": ("Continents + Countries", "Países embebidos (1:N)"),
    "makers": ("Car_Makers + Model_Details",
               "País embebido como referencia extendida; marcas embebidas (1:N)"),
    "cars": ("Car_Names + Car_Details",
             "Especificaciones embebidas (1:1); fabricante enlazado por makerId"),
}


class DashboardService:
    def __init__(self):
        self.db = get_db()

    def collection_stats(self):
        rows = []
        for name, (source, design) in COLLECTIONS.items():
            stats = self.db.command("collStats", name)
            rows.append({"name": name, "source": source, "design": design,
                         "documents": stats["count"], "indexes": stats["nindexes"],
                         "size_kb": round(stats["size"] / 1024, 1)})
        return rows
