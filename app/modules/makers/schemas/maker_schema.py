from dataclasses import dataclass


@dataclass
class MakerContinent:
    _id: int
    name: str


@dataclass
class MakerCountry:
    _id: int
    name: str
    continent: MakerContinent


@dataclass
class MakerModel:
    _id: int
    name: str


@dataclass
class Maker:
    _id: int
    name: str
    fullName: str
    country: MakerCountry
    models: list[MakerModel]


MAKER_INDEXES = [({"models.name": 1}, {"unique": True})]
