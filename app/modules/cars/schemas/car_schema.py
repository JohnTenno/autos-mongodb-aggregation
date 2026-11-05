from dataclasses import dataclass


@dataclass
class CarModel:
    _id: int
    name: str


@dataclass
class Details:
    mpg: float
    cylinders: int
    edispl: int
    horsepower: int
    weight: int
    accel: float
    year: int


@dataclass
class Car:
    _id: int
    descr: str
    model: CarModel
    makerId: int
    details: Details


CAR_INDEXES = [({"makerId": 1}, {}), ({"model._id": 1}, {})]
