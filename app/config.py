"""Application settings, read once from the environment."""
import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Config:
    """Everything the app needs to boot.

    Defaults match a local mongod on the standard port, so the app runs out
    of the box when .env is missing.
    """

    mongo_uri: str
    db_name: str
    secret_key: str

    @classmethod
    def from_env(cls) -> "Config":
        return cls(
            mongo_uri=os.getenv("MONGO_URI", "mongodb://localhost:27017"),
            db_name=os.getenv("DB_NAME", "autos"),
            secret_key=os.getenv("SECRET_KEY", "autos-bda-development-key"),
        )

    @property
    def db_target(self) -> str:
        """Human readable connection target, shown in the top bar."""
        host = self.mongo_uri.split("@")[-1].removeprefix("mongodb://")
        return f"{host}/{self.db_name}"
