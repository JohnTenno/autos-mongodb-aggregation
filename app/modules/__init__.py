"""Feature modules, each one owning its routes, DTOs and data access.

Every module exposes a Flask blueprint named ``blueprint``; adding a feature
means creating a folder here and listing it below.
"""
from flask import Flask

from app.modules.dashboard.controller import blueprint as dashboard
from app.modules.queries.controller import blueprint as queries

BLUEPRINTS = (dashboard, queries)


def register_modules(app: Flask) -> None:
    for blueprint in BLUEPRINTS:
        app.register_blueprint(blueprint)
