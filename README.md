# BD Autos on MongoDB

Project 2a for Advanced Databases. We migrated the Oracle database BDAutosU2 to MongoDB, answered the 25 required queries with the Aggregation Framework, and built a Python (Flask) app that runs each query and shows its code and its result.

Team: Leonardo Franco Bulkley, Ivan Eduardo Urrutia Rodriguez and Jonathan Gandara Salazar.

## Collections

| Collection | Tables | Design |
|---|---|---|
| `continents` | Continents, Countries | Countries are embedded in their continent |
| `makers` | Car_Makers, Model_Details | Embeds its country (with the continent) and the list of brands in `models` |
| `cars` | Car_Names, Car_Details | Specs are embedded in `details`, the brand is copied into `model` and the maker is linked through `makerId` |

Each collection has its schema as a class (like `@Schema()` in NestJS) in `app/modules/<collection>/schemas/`. There are indexes on `cars.makerId`, `cars.model._id` and `makers.models.name` (unique).

## Structure

Organized like a NestJS project: each collection is a module with its controller, service and schema.
The service has one method per query (`query1`, `query2`, ...) that runs the pipeline on its collection and returns the pipeline and the result. The controller has one route per query.

```
main.py                     starts the app
app/__init__.py             creates the app and registers the controllers
app/database.py             MongoDB connection
app/modules/
  cars/                     cars_controller.py, cars_service.py (19 queries), schemas/car_schema.py
  makers/                   makers_controller.py, makers_service.py (5 queries), schemas/maker_schema.py
  continents/               continents_controller.py, continents_service.py (query 9), schemas/continent_schema.py
  dashboard/                collection summary
app/templates/              query.html (code and result), menu with the 25 queries in partials/
database/                   autos_mongodb.js (creates the database) and queries.js (the 25 queries)
scripts/                    migrate.py (loads the data) and export_queries.py (writes queries.js)
docs/                       assignment, data dictionary, Oracle script and report
tests/                      checks that the 25 queries run
```

## Running it

Requires MongoDB (tested with 8.0) and Python 3.12.

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env

.venv/bin/python -m scripts.migrate   # creates the autos database
.venv/bin/python main.py              # open http://127.0.0.1:5000
```

The database can also be created with `mongosh database/autos_mongodb.js`.

Tests: `.venv/bin/python -m unittest discover tests`
