"""Document model of the autos database.

Relational BDAutosU2 -> MongoDB:

* continents  Continents + Countries. Countries are embedded (1:N, small and
              always read with their continent).
* makers      Car_Makers + Model_Details. The country (with its continent) is
              embedded as an extended reference, and the brands each group
              sells are embedded as the ``models`` array (1:N catalog).
* cars        Car_Names + Car_Details. The technical specs are embedded as
              ``details`` (1:1, same key). The brand is copied as ``model``
              {_id, name} and the maker is linked through ``makerId``.

The validators below are applied by scripts/migrate.py and written into
database/autos_mongodb.js, so both paths build the same collections.
"""

COLLECTIONS = ("continents", "makers", "cars")

VALIDATORS = {
    "continents": {
        "bsonType": "object",
        "required": ["_id", "name", "countries"],
        "properties": {
            "_id": {"bsonType": "int"},
            "name": {"bsonType": "string"},
            "countries": {
                "bsonType": "array",
                "items": {
                    "bsonType": "object",
                    "required": ["_id", "name"],
                    "properties": {
                        "_id": {"bsonType": "int"},
                        "name": {"bsonType": "string"},
                    },
                },
            },
        },
    },
    "makers": {
        "bsonType": "object",
        "required": ["_id", "name", "fullName", "country", "models"],
        "properties": {
            "_id": {"bsonType": "int"},
            "name": {"bsonType": "string"},
            "fullName": {"bsonType": "string"},
            "country": {
                "bsonType": "object",
                "required": ["_id", "name", "continent"],
            },
            "models": {
                "bsonType": "array",
                "items": {
                    "bsonType": "object",
                    "required": ["_id", "name"],
                },
            },
        },
    },
    "cars": {
        "bsonType": "object",
        "required": ["_id", "descr", "model", "makerId", "details"],
        "properties": {
            "_id": {"bsonType": "int"},
            "descr": {"bsonType": "string"},
            "makerId": {"bsonType": "int"},
            "model": {"bsonType": "object", "required": ["_id", "name"]},
            "details": {
                "bsonType": "object",
                "required": ["mpg", "cylinders", "edispl", "horsepower",
                             "weight", "accel", "year"],
                "properties": {
                    "mpg": {"bsonType": ["int", "double"], "minimum": 0},
                    "cylinders": {"bsonType": "int", "minimum": 1},
                    "edispl": {"bsonType": "int"},
                    "horsepower": {"bsonType": "int", "minimum": 0},
                    "weight": {"bsonType": "int", "minimum": 0},
                    "accel": {"bsonType": ["int", "double"], "minimum": 0},
                    "year": {"bsonType": "int"},
                },
            },
        },
    },
}

# (collection, keys, options) created after loading the data.
INDEXES = (
    ("cars", [("makerId", 1)], {"name": "cars_maker"}),
    ("cars", [("model._id", 1)], {"name": "cars_model"}),
    ("makers", [("models.name", 1)], {"name": "makers_model_name", "unique": True}),
)
