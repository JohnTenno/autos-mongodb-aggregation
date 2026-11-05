import os
from dataclasses import dataclass

from dotenv import load_dotenv

load_dotenv()


@dataclass(frozen=True)
class Config:
    mongo_uri: str
    db_name: str

    @classmethod
    def from_env(cls) -> "Config":
        return cls(
            mongo_uri=os.getenv("MONGO_URI", "mongodb://localhost:27017"),
            db_name=os.getenv("DB_NAME", "autos"),
        )

    @property
    def db_target(self) -> str:
        host = self.mongo_uri.split("@")[-1].removeprefix("mongodb://")
        return f"{host}/{self.db_name}"
