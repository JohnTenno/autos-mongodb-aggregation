from app.database import get_db


class ContinentsService:
    def __init__(self):
        self.continents = get_db()["continents"]

    def query9(self):
        """9. Contar cuántos modelos (marcas) hay por continente."""
        pipeline = [
            {"$lookup": {"from": "makers", "localField": "_id",
                         "foreignField": "country.continent._id", "as": "makers"}},
            {"$project": {"_id": 0, "continente": "$name", "marcas": {
                "$sum": {"$map": {"input": "$makers", "in": {"$size": "$$this.models"}}}}}},
            {"$sort": {"marcas": -1, "continente": 1}},
        ]
        return pipeline, list(self.continents.aggregate(pipeline))
