"""Running pipelines against the autos database."""
from pymongo.errors import PyMongoError

from app.core.database import get_db
from app.core.exceptions import translate


def aggregate(collection: str, pipeline: list) -> list[dict]:
    try:
        return list(get_db()[collection].aggregate(pipeline))
    except PyMongoError as error:
        raise translate(error) from error
