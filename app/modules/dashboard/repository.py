"""Collection statistics straight from MongoDB."""
from pymongo.errors import PyMongoError

from app.core.database import get_db
from app.core.exceptions import translate


def stats(collection: str) -> dict:
    """collStats: document count, index count and data size in bytes."""
    try:
        return get_db().command("collStats", collection)
    except PyMongoError as error:
        raise translate(error) from error
