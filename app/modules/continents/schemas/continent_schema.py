from dataclasses import dataclass


@dataclass
class Country:
    _id: int
    name: str


@dataclass
class Continent:
    _id: int
    name: str
    countries: list[Country]


CONTINENT_INDEXES = []
