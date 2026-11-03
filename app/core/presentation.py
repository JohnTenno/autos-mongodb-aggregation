"""Template globals shared by every page."""
from flask import Flask


def register(app: Flask) -> None:
    @app.context_processor
    def inject_globals() -> dict:
        return {"db_target": app.config["APP_CONFIG"].db_target}
