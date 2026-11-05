from app.database import get_db

MORE_THAN_ONE_MODEL = {"$match": {"models.1": {"$exists": True}}}


class MakersService:
    def __init__(self):
        self.makers = get_db()["makers"]

    def query5(self):
        """5. Obtener los fabricantes que comercializan más de una marca o línea de modelo,
        mostrando nombre, país y modelos."""
        pipeline = [
            MORE_THAN_ONE_MODEL,
            {"$project": {"_id": 0, "name": 1, "country": "$country.name",
                          "models": "$models.name"}},
            {"$sort": {"name": 1}},
        ]
        return pipeline, list(self.makers.aggregate(pipeline))

    def query13(self):
        """13. Desde la colección makers, obtener cuántos autos tiene registrados cada
        fabricante (incluidos los que tienen cero)."""
        pipeline = [
            {"$lookup": {"from": "cars", "localField": "_id",
                         "foreignField": "makerId", "as": "autos"}},
            {"$project": {"_id": 0, "fabricante": "$name", "autos": {"$size": "$autos"}}},
            {"$sort": {"autos": -1, "fabricante": 1}},
        ]
        return pipeline, list(self.makers.aggregate(pipeline))

    def query14(self):
        """14. Encontrar los modelos del catálogo que no tienen ningún auto registrado."""
        pipeline = [
            {"$unwind": "$models"},
            {"$lookup": {"from": "cars", "localField": "models._id",
                         "foreignField": "model._id", "as": "autos"}},
            {"$match": {"autos": {"$size": 0}}},
            {"$project": {"_id": 0, "modelo": "$models.name", "fabricante": "$name"}},
        ]
        return pipeline, list(self.makers.aggregate(pipeline))

    def query17(self):
        """17. Para cada fabricante con más de un modelo, determinar cuál de sus modelos tiene
        más autos registrados."""
        pipeline = [
            MORE_THAN_ONE_MODEL,
            {"$unwind": "$models"},
            {"$lookup": {"from": "cars", "localField": "models._id",
                         "foreignField": "model._id", "as": "autos"}},
            {"$set": {"autos": {"$size": "$autos"}}},
            {"$group": {"_id": "$name",
                        "top": {"$top": {"sortBy": {"autos": -1, "models.name": 1},
                                         "output": {"modelo": "$models.name",
                                                    "autos": "$autos"}}}}},
            {"$project": {"_id": 0, "fabricante": "$_id", "modelo": "$top.modelo",
                          "autos": "$top.autos"}},
            {"$sort": {"fabricante": 1}},
        ]
        return pipeline, list(self.makers.aggregate(pipeline))

    def query22(self):
        """22. Para cada fabricante, mostrar solo los modelos cuyo nombre es distinto al nombre
        del fabricante, descartando a los fabricantes que no tengan ninguno."""
        pipeline = [
            {"$project": {"_id": 0, "fabricante": "$name", "modelos": {"$map": {
                "input": {"$filter": {"input": "$models",
                                      "cond": {"$ne": ["$$this.name", "$name"]}}},
                "in": "$$this.name"}}}},
            {"$match": {"modelos.0": {"$exists": True}}},
            {"$sort": {"fabricante": 1}},
        ]
        return pipeline, list(self.makers.aggregate(pipeline))
