"""MongoDB access shared by every module.

PyMongo's MongoClient is thread safe and keeps its own connection pool, so a
single client lives for the whole application instead of one per request.
"""
from flask import Flask, current_app
from pymongo import MongoClient
from pymongo.database import Database

CLIENT_KEY = "mongo_client"


def connect(uri: str) -> MongoClient:
    # Fail in 3 s instead of the 30 s default when mongod is not running.
    return MongoClient(uri, serverSelectionTimeoutMS=3000)


def get_db() -> Database:
    """The configured database, using the app-wide client."""
    config = current_app.config["APP_CONFIG"]
    return current_app.extensions[CLIENT_KEY][config.db_name]


def register(app: Flask) -> None:
    app.extensions[CLIENT_KEY] = connect(app.config["APP_CONFIG"].mongo_uri)
