"""The 25 required queries, written once as aggregation pipelines.

The app runs these pipelines and renders them as mongosh code
(app/core/mongosh.py), and scripts/export_queries.py writes the same text to
database/consultas.js, so the code shown, the code saved and the code run
never drift apart.
"""
from dataclasses import dataclass


@dataclass(frozen=True)
class Query:
    number: int
    title: str
    statement: str
    collection: str
    pipeline: list
    note: str = ""


# cars only stores makerId; this brings the maker (with its embedded country
# and continent) next to every car.
WITH_MAKER = [
    {"$lookup": {"from": "makers", "localField": "makerId",
                 "foreignField": "_id", "as": "maker"}},
    {"$unwind": "$maker"},
]

EUROPE = {"maker.country.continent.name": "europe"}

QUERIES = (
    Query(
        1, "Autos 2024+ con al menos 35 mpg",
        "Obtener los autos de modelo 2024 en adelante con rendimiento de al menos 35 mpg. "
        "Mostrar solo la descripción, el año y el rendimiento, ordenados de mayor a menor "
        "rendimiento.",
        "cars",
        [
            {"$match": {"details.year": {"$gte": 2024}, "details.mpg": {"$gte": 35}}},
            {"$project": {"_id": 0, "descr": 1, "year": "$details.year",
                          "mpg": "$details.mpg"}},
            {"$sort": {"mpg": -1, "descr": 1}},
        ],
    ),
    Query(
        2, "Europeos de 4 cilindros y 250 hp o más",
        "Listar los autos de fabricantes europeos con motor de 4 cilindros y al menos 250 hp, "
        "mostrando descripción, país y potencia, ordenados por potencia descendente.",
        "cars",
        [
            {"$match": {"details.cylinders": 4, "details.horsepower": {"$gte": 250}}},
            *WITH_MAKER,
            {"$match": EUROPE},
            {"$project": {"_id": 0, "descr": 1, "country": "$maker.country.name",
                          "horsepower": "$details.horsepower"}},
            {"$sort": {"horsepower": -1, "descr": 1}},
        ],
    ),
    Query(
        3, "Japoneses con motor turbo",
        "Contar cuántos autos de fabricantes japoneses tienen motor turbo, es decir, cuya "
        "descripción termina con la cilindrada seguida de \"t\" (por ejemplo \"1.5t\").",
        "cars",
        [
            {"$match": {"descr": {"$regex": "\\d\\.\\dt$"}}},
            *WITH_MAKER,
            {"$match": {"maker.country.name": "japan"}},
            {"$count": "turbosJaponeses"},
        ],
        "La expresión regular \\d\\.\\dt$ pide un dígito, un punto, un dígito y la t al final.",
    ),
    Query(
        4, "Ligeros y rápidos, o grandes y eficientes",
        "Encontrar los autos que cumplan cualquiera de estas condiciones: (a) pesan menos de "
        "3000 lb y aceleran de 0 a 60 mph en menos de 9 s, o (b) tienen 8 o más cilindros y "
        "rinden al menos 19 mpg.",
        "cars",
        [
            {"$match": {"$or": [
                {"details.weight": {"$lt": 3000}, "details.accel": {"$lt": 9}},
                {"details.cylinders": {"$gte": 8}, "details.mpg": {"$gte": 19}},
            ]}},
            {"$project": {"_id": 0, "descr": 1, "weight": "$details.weight",
                          "accel": "$details.accel", "cylinders": "$details.cylinders",
                          "mpg": "$details.mpg"}},
            {"$sort": {"descr": 1}},
        ],
    ),
    Query(
        5, "Fabricantes con más de una marca",
        "Obtener los fabricantes que comercializan más de una marca o línea de modelo, "
        "mostrando nombre, país y modelos.",
        "makers",
        [
            {"$match": {"models.1": {"$exists": True}}},
            {"$project": {"_id": 0, "name": 1, "country": "$country.name",
                          "models": "$models.name"}},
            {"$sort": {"name": 1}},
        ],
        "models.1 existe solo cuando el arreglo embebido tiene al menos dos marcas.",
    ),
    Query(
        6, "Marca distinta del grupo fabricante",
        "Encontrar los autos cuya marca (model.name) es distinta del nombre de su grupo "
        "fabricante (maker.name). Mostrar descripción, marca y fabricante.",
        "cars",
        [
            *WITH_MAKER,
            {"$match": {"$expr": {"$ne": ["$model.name", "$maker.name"]}}},
            {"$project": {"_id": 0, "descr": 1, "marca": "$model.name",
                          "fabricante": "$maker.name"}},
            {"$sort": {"fabricante": 1, "descr": 1}},
        ],
    ),
    Query(
        7, "Autos, rendimiento y potencia por país",
        "Calcular por país el número de autos, el rendimiento promedio y la potencia promedio "
        "(redondeados a 1 decimal), ordenado por número de autos.",
        "cars",
        [
            *WITH_MAKER,
            {"$group": {"_id": "$maker.country.name", "autos": {"$sum": 1},
                        "mpg": {"$avg": "$details.mpg"},
                        "hp": {"$avg": "$details.horsepower"}}},
            {"$project": {"_id": 0, "pais": "$_id", "autos": 1,
                          "mpgPromedio": {"$round": ["$mpg", 1]},
                          "hpPromedio": {"$round": ["$hp", 1]}}},
            {"$sort": {"autos": -1, "pais": 1}},
        ],
    ),
    Query(
        8, "Autos, marcas y potencia por grupo",
        "Calcular para cada grupo fabricante el número de autos, el número de marcas distintas "
        "con autos registrados y la potencia promedio (redondeada a 1 decimal), ordenado por "
        "número de autos.",
        "cars",
        [
            {"$group": {"_id": "$makerId", "autos": {"$sum": 1},
                        "marcas": {"$addToSet": "$model._id"},
                        "hp": {"$avg": "$details.horsepower"}}},
            {"$lookup": {"from": "makers", "localField": "_id",
                         "foreignField": "_id", "as": "maker"}},
            {"$project": {"_id": 0, "fabricante": {"$first": "$maker.name"}, "autos": 1,
                          "marcas": {"$size": "$marcas"},
                          "hpPromedio": {"$round": ["$hp", 1]}}},
            {"$sort": {"autos": -1, "fabricante": 1}},
        ],
    ),
    Query(
        9, "Marcas por continente",
        "Contar cuántos modelos (marcas) hay por continente.",
        "continents",
        [
            {"$lookup": {"from": "makers", "localField": "_id",
                         "foreignField": "country.continent._id", "as": "makers"}},
            {"$project": {"_id": 0, "continente": "$name", "marcas": {
                "$sum": {"$map": {"input": "$makers", "in": {"$size": "$$this.models"}}}}}},
            {"$sort": {"marcas": -1, "continente": 1}},
        ],
        "Parte de continents para que aparezcan también los continentes sin marcas.",
    ),
    Query(
        10, "Autos por rango de rendimiento",
        "Clasificar los autos en rangos de rendimiento [0,20), [20,25), [25,30), [30,35), "
        "[35,40) y 40 o más, contando cuántos hay en cada rango y su peso promedio.",
        "cars",
        [
            {"$bucket": {"groupBy": "$details.mpg",
                         "boundaries": [0, 20, 25, 30, 35, 40],
                         "default": "40 o más",
                         "output": {"autos": {"$sum": 1},
                                    "peso": {"$avg": "$details.weight"}}}},
            {"$project": {"_id": 0, "rango": {"$cond": [
                {"$eq": [{"$type": "$_id"}, "string"]}, "$_id",
                {"$concat": ["[", {"$toString": "$_id"}, ", ",
                             {"$toString": {"$add": [
                                 "$_id", {"$cond": [{"$eq": ["$_id", 0]}, 20, 5]}]}},
                             ")"]}]},
                "autos": 1, "pesoPromedio": {"$round": ["$peso", 1]}}},
        ],
        "$bucket usa cada límite como inicio de un rango; lo que pasa de 40 cae en default.",
    ),
    Query(
        11, "Top 5 fabricantes por rendimiento",
        "Obtener los 5 fabricantes con mayor rendimiento promedio, considerando solo aquellos "
        "con al menos 8 autos registrados.",
        "cars",
        [
            {"$group": {"_id": "$makerId", "autos": {"$sum": 1},
                        "mpg": {"$avg": "$details.mpg"}}},
            {"$match": {"autos": {"$gte": 8}}},
            {"$sort": {"mpg": -1}},
            {"$limit": 5},
            {"$lookup": {"from": "makers", "localField": "_id",
                         "foreignField": "_id", "as": "maker"}},
            {"$project": {"_id": 0, "fabricante": {"$first": "$maker.name"}, "autos": 1,
                          "mpgPromedio": {"$round": ["$mpg", 1]}}},
        ],
    ),
    Query(
        12, "Categoría de rendimiento por continente",
        "Clasificar cada auto como \"Alta\" (mpg ≥ 30), \"Media\" (20 ≤ mpg < 30) o \"Baja\" "
        "(mpg < 20) y contar cuántos autos hay por continente y categoría.",
        "cars",
        [
            *WITH_MAKER,
            {"$set": {"categoria": {"$switch": {
                "branches": [
                    {"case": {"$gte": ["$details.mpg", 30]}, "then": "Alta"},
                    {"case": {"$gte": ["$details.mpg", 20]}, "then": "Media"},
                ],
                "default": "Baja"}}}},
            {"$group": {"_id": {"continente": "$maker.country.continent.name",
                                "categoria": "$categoria"},
                        "autos": {"$sum": 1}}},
            {"$project": {"_id": 0, "continente": "$_id.continente",
                          "categoria": "$_id.categoria", "autos": 1}},
            {"$sort": {"continente": 1, "categoria": 1}},
        ],
    ),
    Query(
        13, "Autos registrados por fabricante",
        "Desde la colección makers, obtener cuántos autos tiene registrados cada fabricante "
        "(incluidos los que tienen cero).",
        "makers",
        [
            {"$lookup": {"from": "cars", "localField": "_id",
                         "foreignField": "makerId", "as": "autos"}},
            {"$project": {"_id": 0, "fabricante": "$name", "autos": {"$size": "$autos"}}},
            {"$sort": {"autos": -1, "fabricante": 1}},
        ],
        "Al partir de makers, un fabricante sin autos queda con un arreglo vacío y cuenta 0.",
    ),
    Query(
        14, "Marcas del catálogo sin autos",
        "Encontrar los modelos del catálogo que no tienen ningún auto registrado.",
        "makers",
        [
            {"$unwind": "$models"},
            {"$lookup": {"from": "cars", "localField": "models._id",
                         "foreignField": "model._id", "as": "autos"}},
            {"$match": {"autos": {"$size": 0}}},
            {"$project": {"_id": 0, "modelo": "$models.name", "fabricante": "$name"}},
        ],
    ),
    Query(
        15, "Los 5 autos más potentes",
        "Para los 5 autos más potentes, obtener su descripción, potencia y el nombre completo "
        "(fullName) de su fabricante.",
        "cars",
        [
            {"$sort": {"details.horsepower": -1}},
            {"$limit": 5},
            *WITH_MAKER,
            {"$project": {"_id": 0, "descr": 1, "horsepower": "$details.horsepower",
                          "fabricante": "$maker.fullName"}},
        ],
    ),
    Query(
        16, "Top 3 en rendimiento por continente",
        "Obtener, para cada continente, los 3 autos con mayor rendimiento (descripción y mpg).",
        "cars",
        [
            *WITH_MAKER,
            {"$group": {"_id": "$maker.country.continent.name",
                        "autos": {"$topN": {"n": 3,
                                            "sortBy": {"details.mpg": -1, "descr": 1},
                                            "output": {"descr": "$descr",
                                                       "mpg": "$details.mpg"}}}}},
            {"$project": {"_id": 0, "continente": "$_id", "autos": 1}},
            {"$sort": {"continente": 1}},
        ],
    ),
    Query(
        17, "Marca con más autos de cada fabricante",
        "Para cada fabricante con más de un modelo, determinar cuál de sus modelos tiene más "
        "autos registrados.",
        "makers",
        [
            {"$match": {"models.1": {"$exists": True}}},
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
        ],
    ),
    Query(
        18, "Porcentaje de autos por continente",
        "Calcular el porcentaje que representa cada continente sobre el total de autos, con 2 "
        "decimales.",
        "cars",
        [
            *WITH_MAKER,
            {"$group": {"_id": "$maker.country.continent.name", "autos": {"$sum": 1}}},
            {"$setWindowFields": {"output": {"total": {
                "$sum": "$autos", "window": {"documents": ["unbounded", "unbounded"]}}}}},
            {"$project": {"_id": 0, "continente": "$_id", "autos": 1,
                          "porcentaje": {"$round": [
                              {"$multiply": [{"$divide": ["$autos", "$total"]}, 100]}, 2]}}},
            {"$sort": {"porcentaje": -1}},
        ],
    ),
    Query(
        19, "Más eficientes que su grupo de cilindros",
        "Listar los 5 autos que más superan el rendimiento promedio de los autos con su mismo "
        "número de cilindros, mostrando ese promedio y la diferencia.",
        "cars",
        [
            {"$setWindowFields": {"partitionBy": "$details.cylinders", "output": {
                "promedio": {"$avg": "$details.mpg",
                             "window": {"documents": ["unbounded", "unbounded"]}}}}},
            {"$set": {"diferencia": {"$subtract": ["$details.mpg", "$promedio"]}}},
            {"$sort": {"diferencia": -1}},
            {"$limit": 5},
            {"$project": {"_id": 0, "descr": 1, "cylinders": "$details.cylinders",
                          "mpg": "$details.mpg",
                          "promedio": {"$round": ["$promedio", 2]},
                          "diferencia": {"$round": ["$diferencia", 2]}}},
        ],
    ),
    Query(
        20, "Autos de 8+ cilindros por continente",
        "Calcular, por continente, el número de autos, cuántos tienen 8 o más cilindros y el "
        "porcentaje que representan (1 decimal).",
        "cars",
        [
            *WITH_MAKER,
            {"$group": {"_id": "$maker.country.continent.name", "autos": {"$sum": 1},
                        "ochoOMas": {"$sum": {"$cond": [
                            {"$gte": ["$details.cylinders", 8]}, 1, 0]}}}},
            {"$project": {"_id": 0, "continente": "$_id", "autos": 1, "ochoOMas": 1,
                          "porcentaje": {"$round": [
                              {"$multiply": [{"$divide": ["$ochoOMas", "$autos"]}, 100]}, 1]}}},
            {"$sort": {"autos": -1}},
        ],
    ),
    Query(
        21, "Potencia por cada 1000 lb",
        "Calcular la potencia por cada 1000 lb de peso y mostrar los 10 autos con mayor valor, "
        "junto con su país.",
        "cars",
        [
            {"$set": {"hpPor1000lb": {"$round": [{"$multiply": [
                {"$divide": ["$details.horsepower", "$details.weight"]}, 1000]}, 1]}}},
            {"$sort": {"hpPor1000lb": -1}},
            {"$limit": 10},
            *WITH_MAKER,
            {"$project": {"_id": 0, "descr": 1, "hpPor1000lb": 1,
                          "pais": "$maker.country.name"}},
        ],
    ),
    Query(
        22, "Marcas con nombre distinto al fabricante",
        "Para cada fabricante, mostrar solo los modelos cuyo nombre es distinto al nombre del "
        "fabricante, descartando a los fabricantes que no tengan ninguno.",
        "makers",
        [
            {"$project": {"_id": 0, "fabricante": "$name", "modelos": {"$map": {
                "input": {"$filter": {"input": "$models",
                                      "cond": {"$ne": ["$$this.name", "$name"]}}},
                "in": "$$this.name"}}}},
            {"$match": {"modelos.0": {"$exists": True}}},
            {"$sort": {"fabricante": 1}},
        ],
    ),
    Query(
        23, "Tres resúmenes en una sola consulta",
        "En una sola consulta, obtener: (a) el número de autos por continente, (b) el número de "
        "autos por cilindros y (c) las estadísticas globales de mpg (mínimo, máximo y "
        "promedio).",
        "cars",
        [
            {"$facet": {
                "porContinente": [
                    *WITH_MAKER,
                    {"$group": {"_id": "$maker.country.continent.name",
                                "autos": {"$sum": 1}}},
                    {"$sort": {"autos": -1}},
                ],
                "porCilindros": [
                    {"$group": {"_id": "$details.cylinders", "autos": {"$sum": 1}}},
                    {"$sort": {"_id": 1}},
                ],
                "mpgGlobal": [
                    {"$group": {"_id": None, "minimo": {"$min": "$details.mpg"},
                                "maximo": {"$max": "$details.mpg"},
                                "promedio": {"$avg": "$details.mpg"}}},
                    {"$project": {"_id": 0, "minimo": 1, "maximo": 1,
                                  "promedio": {"$round": ["$promedio", 2]}}},
                ],
            }},
        ],
    ),
    Query(
        24, "Ranking de potencia de autos alemanes",
        "Asignar a cada auto alemán su posición por potencia dentro de su país y mostrar los "
        "5 primeros.",
        "cars",
        [
            *WITH_MAKER,
            {"$match": {"maker.country.name": "germany"}},
            {"$setWindowFields": {"partitionBy": "$maker.country.name",
                                  "sortBy": {"details.horsepower": -1},
                                  "output": {"posicion": {"$rank": {}}}}},
            {"$sort": {"posicion": 1, "descr": 1}},
            {"$limit": 5},
            {"$project": {"_id": 0, "posicion": 1, "descr": 1,
                          "horsepower": "$details.horsepower"}},
        ],
        "$rank da la misma posición a los empates y salta la siguiente.",
    ),
    Query(
        25, "Auto más eficiente de cada fabricante europeo",
        "Obtener para cada fabricante europeo su auto más eficiente.",
        "cars",
        [
            *WITH_MAKER,
            {"$match": EUROPE},
            {"$group": {"_id": "$maker.name",
                        "auto": {"$top": {"sortBy": {"details.mpg": -1, "descr": 1},
                                          "output": {"descr": "$descr",
                                                     "mpg": "$details.mpg"}}}}},
            {"$project": {"_id": 0, "fabricante": "$_id", "descr": "$auto.descr",
                          "mpg": "$auto.mpg"}},
            {"$sort": {"fabricante": 1}},
        ],
    ),
)

BY_NUMBER = {query.number: query for query in QUERIES}

assert sorted(BY_NUMBER) == list(range(1, 26))
