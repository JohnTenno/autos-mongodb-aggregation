# BD Autos en MongoDB

Proyecto 2a de Bases de Datos Avanzadas. La base relacional BDAutosU2 (Oracle) migrada a MongoDB, las 25 consultas con Aggregation Framework y una aplicación en Python (Flask) que ejecuta cada consulta y muestra su código y su resultado.

## Modelo de documentos

| Colección | Tablas de origen | Diseño |
|---|---|---|
| `continents` | Continents + Countries | Los países van embebidos (1:N) |
| `makers` | Car_Makers + Model_Details | El país, con su continente, va embebido como referencia extendida. Las marcas van embebidas en `models` (1:N) |
| `cars` | Car_Names + Car_Details | Las especificaciones van embebidas en `details` (1:1). La marca se copia en `model` y el fabricante se enlaza con `makerId` (linking) |

Las tres colecciones tienen validador `$jsonSchema`. Hay índices en `cars.makerId`, `cars.model._id` y `makers.models.name` (este último es único, como `model_unique` en Oracle).

## Estructura

```
app/
  config.py            configuración desde .env
  core/                conexión, errores, esquema y render de código mongosh
  modules/
    dashboard/         resumen de colecciones (controller, service, repository, dto)
    queries/           las 25 consultas (catalog, controller, service, repository, dto)
  templates/, static/  interfaz
database/
  autos_mongodb.js     crea la base, las colecciones y los datos
  consultas.js         las 25 consultas
scripts/
  migrate.py           lee BDAutosU2.sql y carga MongoDB
  export_queries.py    genera database/consultas.js
docs/                  enunciado, diccionario de datos y script relacional
tests/                 prueba de que las 25 consultas corren
```

Las consultas se escriben una sola vez en `app/modules/queries/catalog.py`. La app, `consultas.js` y lo que se muestra en pantalla salen de esa misma definición.

## Cómo correrlo

Requiere MongoDB 7 o superior (se probó con 8.0) y Python 3.12.

```bash
python -m venv .venv
.venv/bin/pip install -r requirements.txt
cp .env.example .env

.venv/bin/python -m scripts.migrate   # crea la base autos
.venv/bin/python main.py              # http://127.0.0.1:5000
```

En lugar de `scripts.migrate` también se puede usar `mongosh database/autos_mongodb.js`.

Pruebas: `.venv/bin/python -m unittest discover tests`
