"""Turning MongoDB failures into messages a reader can act on."""
from pymongo.errors import OperationFailure, PyMongoError, ServerSelectionTimeoutError


class AppError(Exception):
    """A failure worth showing to the user as a notice on the page."""

    def __init__(self, message: str):
        super().__init__(message)
        self.message = message


def translate(error: PyMongoError) -> AppError:
    if isinstance(error, ServerSelectionTimeoutError):
        return AppError(
            "No hay conexión con MongoDB. Inicia mongod y revisa MONGO_URI en el archivo .env.")
    if isinstance(error, OperationFailure):
        return AppError(f"MongoDB rechazó la consulta: {error.details.get('errmsg', error)}")
    return AppError(f"Error de MongoDB: {error}")
