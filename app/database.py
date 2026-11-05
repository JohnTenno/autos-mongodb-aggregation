from pymongo import MongoClient

from app.config import Config

config = Config.from_env()
client = MongoClient(config.mongo_uri, serverSelectionTimeoutMS=3000)


def get_db():
    return client[config.db_name]
