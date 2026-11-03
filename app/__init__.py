"""Application factory.

Wires the cross cutting pieces (config, database, template helpers, error
handling) and then lets every feature module register its own routes.
"""
from flask import Flask, render_template

from app.config import Config
from app.core import database, presentation
from app.core.exceptions import AppError
from app.modules import register_modules


def create_app(config: Config | None = None) -> Flask:
    app = Flask(__name__)
    app.config["APP_CONFIG"] = config or Config.from_env()
    app.secret_key = app.config["APP_CONFIG"].secret_key

    database.register(app)
    presentation.register(app)
    register_modules(app)
    _register_error_handler(app)

    return app


def _register_error_handler(app: Flask) -> None:
    """Show business errors as a notice instead of a 500 page."""

    @app.errorhandler(AppError)
    def handle_app_error(error: AppError):
        return render_template("error.html", message=error.message), 400
