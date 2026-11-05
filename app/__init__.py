from flask import Flask

from app.database import config
from app.modules.cars.cars_controller import cars
from app.modules.continents.continents_controller import continents
from app.modules.dashboard.dashboard_controller import dashboard
from app.modules.makers.makers_controller import makers


def create_app() -> Flask:
    app = Flask(__name__)
    app.jinja_env.policies["json.dumps_kwargs"] = {"sort_keys": False, "ensure_ascii": False}

    app.register_blueprint(dashboard)
    app.register_blueprint(cars)
    app.register_blueprint(makers)
    app.register_blueprint(continents)

    @app.context_processor
    def inject_globals():
        return {"db_target": config.db_target}

    return app
