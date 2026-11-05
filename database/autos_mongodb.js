db = db.getSiblingDB("autos");

db.continents.drop();
db.continents.insertMany([
  {
    "_id": 1,
    "name": "america",
    "countries": [
      {
        "_id": 1,
        "name": "usa"
      },
      {
        "_id": 14,
        "name": "mexico"
      },
      {
        "_id": 15,
        "name": "brazil"
      }
    ]
  },
  {
    "_id": 2,
    "name": "europe",
    "countries": [
      {
        "_id": 2,
        "name": "germany"
      },
      {
        "_id": 3,
        "name": "france"
      },
      {
        "_id": 5,
        "name": "italy"
      },
      {
        "_id": 6,
        "name": "sweden"
      },
      {
        "_id": 7,
        "name": "uk"
      },
      {
        "_id": 9,
        "name": "russia"
      },
      {
        "_id": 17,
        "name": "netherlands"
      }
    ]
  },
  {
    "_id": 3,
    "name": "asia",
    "countries": [
      {
        "_id": 4,
        "name": "japan"
      },
      {
        "_id": 8,
        "name": "korea"
      },
      {
        "_id": 16,
        "name": "china"
      }
    ]
  },
  {
    "_id": 4,
    "name": "africa",
    "countries": [
      {
        "_id": 10,
        "name": "nigeria"
      },
      {
        "_id": 13,
        "name": "egypt"
      }
    ]
  },
  {
    "_id": 5,
    "name": "australia",
    "countries": [
      {
        "_id": 11,
        "name": "australia"
      },
      {
        "_id": 12,
        "name": "new zealand"
      }
    ]
  }
]);

db.makers.drop();
db.makers.insertMany([
  {
    "_id": 1,
    "name": "gm",
    "fullName": "General Motors",
    "country": {
      "_id": 1,
      "name": "usa",
      "continent": {
        "_id": 1,
        "name": "america"
      }
    },
    "models": [
      {
        "_id": 1,
        "name": "chevrolet"
      },
      {
        "_id": 2,
        "name": "gmc"
      },
      {
        "_id": 3,
        "name": "cadillac"
      },
      {
        "_id": 4,
        "name": "buick"
      }
    ]
  },
  {
    "_id": 2,
    "name": "ford",
    "fullName": "Ford Motor Company",
    "country": {
      "_id": 1,
      "name": "usa",
      "continent": {
        "_id": 1,
        "name": "america"
      }
    },
    "models": [
      {
        "_id": 5,
        "name": "ford"
      },
      {
        "_id": 6,
        "name": "lincoln"
      }
    ]
  },
  {
    "_id": 3,
    "name": "stellantis",
    "fullName": "Stellantis N.V.",
    "country": {
      "_id": 17,
      "name": "netherlands",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 7,
        "name": "jeep"
      },
      {
        "_id": 8,
        "name": "dodge"
      },
      {
        "_id": 9,
        "name": "ram"
      },
      {
        "_id": 10,
        "name": "chrysler"
      },
      {
        "_id": 11,
        "name": "fiat"
      },
      {
        "_id": 12,
        "name": "peugeot"
      },
      {
        "_id": 13,
        "name": "alfa romeo"
      }
    ]
  },
  {
    "_id": 4,
    "name": "toyota",
    "fullName": "Toyota Motor Corporation",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 14,
        "name": "toyota"
      },
      {
        "_id": 15,
        "name": "lexus"
      }
    ]
  },
  {
    "_id": 5,
    "name": "honda",
    "fullName": "Honda Motor Co.",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 16,
        "name": "honda"
      },
      {
        "_id": 17,
        "name": "acura"
      }
    ]
  },
  {
    "_id": 6,
    "name": "nissan",
    "fullName": "Nissan Motor Co.",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 18,
        "name": "nissan"
      },
      {
        "_id": 19,
        "name": "infiniti"
      }
    ]
  },
  {
    "_id": 7,
    "name": "mazda",
    "fullName": "Mazda Motor Corporation",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 20,
        "name": "mazda"
      }
    ]
  },
  {
    "_id": 8,
    "name": "subaru",
    "fullName": "Subaru Corporation",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 21,
        "name": "subaru"
      }
    ]
  },
  {
    "_id": 9,
    "name": "mitsubishi",
    "fullName": "Mitsubishi Motors",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 22,
        "name": "mitsubishi"
      }
    ]
  },
  {
    "_id": 10,
    "name": "suzuki",
    "fullName": "Suzuki Motor Corporation",
    "country": {
      "_id": 4,
      "name": "japan",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 23,
        "name": "suzuki"
      }
    ]
  },
  {
    "_id": 11,
    "name": "hyundai",
    "fullName": "Hyundai Motor Group",
    "country": {
      "_id": 8,
      "name": "korea",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 24,
        "name": "hyundai"
      },
      {
        "_id": 25,
        "name": "kia"
      },
      {
        "_id": 26,
        "name": "genesis"
      }
    ]
  },
  {
    "_id": 12,
    "name": "volkswagen",
    "fullName": "Volkswagen Group",
    "country": {
      "_id": 2,
      "name": "germany",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 27,
        "name": "volkswagen"
      },
      {
        "_id": 28,
        "name": "audi"
      },
      {
        "_id": 29,
        "name": "porsche"
      },
      {
        "_id": 30,
        "name": "lamborghini"
      },
      {
        "_id": 31,
        "name": "bentley"
      }
    ]
  },
  {
    "_id": 13,
    "name": "bmw",
    "fullName": "BMW Group",
    "country": {
      "_id": 2,
      "name": "germany",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 32,
        "name": "bmw"
      },
      {
        "_id": 33,
        "name": "mini"
      }
    ]
  },
  {
    "_id": 14,
    "name": "mercedes-benz",
    "fullName": "Mercedes-Benz Group",
    "country": {
      "_id": 2,
      "name": "germany",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 34,
        "name": "mercedes-benz"
      }
    ]
  },
  {
    "_id": 15,
    "name": "renault",
    "fullName": "Renault Group",
    "country": {
      "_id": 3,
      "name": "france",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 35,
        "name": "renault"
      },
      {
        "_id": 36,
        "name": "dacia"
      }
    ]
  },
  {
    "_id": 16,
    "name": "volvo",
    "fullName": "Volvo Cars",
    "country": {
      "_id": 6,
      "name": "sweden",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 37,
        "name": "volvo"
      }
    ]
  },
  {
    "_id": 17,
    "name": "jlr",
    "fullName": "Jaguar Land Rover",
    "country": {
      "_id": 7,
      "name": "uk",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 38,
        "name": "land rover"
      },
      {
        "_id": 39,
        "name": "jaguar"
      }
    ]
  },
  {
    "_id": 18,
    "name": "ferrari",
    "fullName": "Ferrari N.V.",
    "country": {
      "_id": 5,
      "name": "italy",
      "continent": {
        "_id": 2,
        "name": "europe"
      }
    },
    "models": [
      {
        "_id": 40,
        "name": "ferrari"
      }
    ]
  },
  {
    "_id": 19,
    "name": "saic",
    "fullName": "SAIC Motor",
    "country": {
      "_id": 16,
      "name": "china",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 41,
        "name": "mg"
      }
    ]
  },
  {
    "_id": 20,
    "name": "chery",
    "fullName": "Chery Automobile",
    "country": {
      "_id": 16,
      "name": "china",
      "continent": {
        "_id": 3,
        "name": "asia"
      }
    },
    "models": [
      {
        "_id": 42,
        "name": "chery"
      }
    ]
  }
]);
db.makers.createIndex({
  "models.name": 1
}, {
  "unique": true
});

db.cars.drop();
db.cars.insertMany([
  {
    "_id": 1,
    "descr": "chevrolet silverado 1500 lt 5.3",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 18,
      "cylinders": 8,
      "edispl": 325,
      "horsepower": 355,
      "weight": 5100,
      "accel": 6.7,
      "year": 2024
    }
  },
  {
    "_id": 2,
    "descr": "chevrolet tahoe lt 5.3",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 17,
      "cylinders": 8,
      "edispl": 325,
      "horsepower": 355,
      "weight": 5600,
      "accel": 7,
      "year": 2024
    }
  },
  {
    "_id": 3,
    "descr": "chevrolet equinox lt 1.5t",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 175,
      "weight": 3600,
      "accel": 8.5,
      "year": 2025
    }
  },
  {
    "_id": 4,
    "descr": "chevrolet trax 1rs 1.2t",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 30,
      "cylinders": 3,
      "edispl": 73,
      "horsepower": 137,
      "weight": 3100,
      "accel": 9,
      "year": 2025
    }
  },
  {
    "_id": 5,
    "descr": "chevrolet malibu lt 1.5t",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 32,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 160,
      "weight": 3150,
      "accel": 8,
      "year": 2024
    }
  },
  {
    "_id": 6,
    "descr": "chevrolet corvette stingray 6.2",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 19,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 495,
      "weight": 3650,
      "accel": 2.9,
      "year": 2025
    }
  },
  {
    "_id": 7,
    "descr": "chevrolet camaro ss 6.2",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 19,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 455,
      "weight": 3685,
      "accel": 4,
      "year": 2024
    }
  },
  {
    "_id": 8,
    "descr": "chevrolet colorado z71 2.7t",
    "model": {
      "_id": 1,
      "name": "chevrolet"
    },
    "makerId": 1,
    "details": {
      "mpg": 19,
      "cylinders": 4,
      "edispl": 165,
      "horsepower": 310,
      "weight": 4500,
      "accel": 6.5,
      "year": 2025
    }
  },
  {
    "_id": 9,
    "descr": "gmc sierra 1500 denali 6.2",
    "model": {
      "_id": 2,
      "name": "gmc"
    },
    "makerId": 1,
    "details": {
      "mpg": 17,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 420,
      "weight": 5600,
      "accel": 5.9,
      "year": 2024
    }
  },
  {
    "_id": 10,
    "descr": "gmc yukon denali 6.2",
    "model": {
      "_id": 2,
      "name": "gmc"
    },
    "makerId": 1,
    "details": {
      "mpg": 16,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 420,
      "weight": 5900,
      "accel": 6.1,
      "year": 2025
    }
  },
  {
    "_id": 11,
    "descr": "gmc terrain sle 1.5t",
    "model": {
      "_id": 2,
      "name": "gmc"
    },
    "makerId": 1,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 175,
      "weight": 3500,
      "accel": 9.1,
      "year": 2024
    }
  },
  {
    "_id": 12,
    "descr": "cadillac escalade 6.2",
    "model": {
      "_id": 3,
      "name": "cadillac"
    },
    "makerId": 1,
    "details": {
      "mpg": 16,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 420,
      "weight": 5900,
      "accel": 5.9,
      "year": 2024
    }
  },
  {
    "_id": 13,
    "descr": "cadillac ct5-v blackwing 6.2",
    "model": {
      "_id": 3,
      "name": "cadillac"
    },
    "makerId": 1,
    "details": {
      "mpg": 15,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 668,
      "weight": 4125,
      "accel": 3.6,
      "year": 2024
    }
  },
  {
    "_id": 14,
    "descr": "cadillac xt5 premium luxury 2.0t",
    "model": {
      "_id": 3,
      "name": "cadillac"
    },
    "makerId": 1,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 235,
      "weight": 4200,
      "accel": 7.3,
      "year": 2024
    }
  },
  {
    "_id": 15,
    "descr": "buick envista 1.2t",
    "model": {
      "_id": 4,
      "name": "buick"
    },
    "makerId": 1,
    "details": {
      "mpg": 30,
      "cylinders": 3,
      "edispl": 73,
      "horsepower": 137,
      "weight": 3100,
      "accel": 9.2,
      "year": 2025
    }
  },
  {
    "_id": 16,
    "descr": "buick enclave 2.5t",
    "model": {
      "_id": 4,
      "name": "buick"
    },
    "makerId": 1,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 328,
      "weight": 4650,
      "accel": 6.5,
      "year": 2025
    }
  },
  {
    "_id": 17,
    "descr": "ford f-150 xlt 2.7 ecoboost",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 21,
      "cylinders": 6,
      "edispl": 165,
      "horsepower": 325,
      "weight": 4700,
      "accel": 6.3,
      "year": 2024
    }
  },
  {
    "_id": 18,
    "descr": "ford f-150 raptor 3.5",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 16,
      "cylinders": 6,
      "edispl": 214,
      "horsepower": 450,
      "weight": 5700,
      "accel": 5.4,
      "year": 2024
    }
  },
  {
    "_id": 19,
    "descr": "ford mustang gt 5.0",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 18,
      "cylinders": 8,
      "edispl": 307,
      "horsepower": 480,
      "weight": 3900,
      "accel": 4.2,
      "year": 2024
    }
  },
  {
    "_id": 20,
    "descr": "ford mustang ecoboost 2.3",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 140,
      "horsepower": 315,
      "weight": 3550,
      "accel": 5.3,
      "year": 2024
    }
  },
  {
    "_id": 21,
    "descr": "ford bronco sport big bend 1.5t",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 26,
      "cylinders": 3,
      "edispl": 91,
      "horsepower": 180,
      "weight": 3500,
      "accel": 8.8,
      "year": 2024
    }
  },
  {
    "_id": 22,
    "descr": "ford bronco badlands 2.7",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 17,
      "cylinders": 6,
      "edispl": 165,
      "horsepower": 330,
      "weight": 4750,
      "accel": 6.4,
      "year": 2024
    }
  },
  {
    "_id": 23,
    "descr": "ford ranger lariat 2.3",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 21,
      "cylinders": 4,
      "edispl": 140,
      "horsepower": 270,
      "weight": 4400,
      "accel": 6.8,
      "year": 2024
    }
  },
  {
    "_id": 24,
    "descr": "ford explorer st 3.0",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 20,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 400,
      "weight": 4700,
      "accel": 5.2,
      "year": 2025
    }
  },
  {
    "_id": 25,
    "descr": "ford escape st-line 1.5t",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 30,
      "cylinders": 3,
      "edispl": 91,
      "horsepower": 180,
      "weight": 3500,
      "accel": 8.3,
      "year": 2025
    }
  },
  {
    "_id": 26,
    "descr": "ford maverick xlt hybrid 2.5",
    "model": {
      "_id": 5,
      "name": "ford"
    },
    "makerId": 2,
    "details": {
      "mpg": 37,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 191,
      "weight": 3700,
      "accel": 7.7,
      "year": 2024
    }
  },
  {
    "_id": 27,
    "descr": "lincoln navigator 3.5",
    "model": {
      "_id": 6,
      "name": "lincoln"
    },
    "makerId": 2,
    "details": {
      "mpg": 18,
      "cylinders": 6,
      "edispl": 214,
      "horsepower": 440,
      "weight": 5900,
      "accel": 6,
      "year": 2024
    }
  },
  {
    "_id": 28,
    "descr": "lincoln aviator 3.0",
    "model": {
      "_id": 6,
      "name": "lincoln"
    },
    "makerId": 2,
    "details": {
      "mpg": 21,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 400,
      "weight": 4900,
      "accel": 5.6,
      "year": 2024
    }
  },
  {
    "_id": 29,
    "descr": "jeep wrangler rubicon 3.6",
    "model": {
      "_id": 7,
      "name": "jeep"
    },
    "makerId": 3,
    "details": {
      "mpg": 19,
      "cylinders": 6,
      "edispl": 220,
      "horsepower": 285,
      "weight": 4500,
      "accel": 7,
      "year": 2024
    }
  },
  {
    "_id": 30,
    "descr": "jeep grand cherokee limited 3.6",
    "model": {
      "_id": 7,
      "name": "jeep"
    },
    "makerId": 3,
    "details": {
      "mpg": 22,
      "cylinders": 6,
      "edispl": 220,
      "horsepower": 293,
      "weight": 4600,
      "accel": 7.5,
      "year": 2024
    }
  },
  {
    "_id": 31,
    "descr": "jeep compass latitude 2.0t",
    "model": {
      "_id": 7,
      "name": "jeep"
    },
    "makerId": 3,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 200,
      "weight": 3600,
      "accel": 7.5,
      "year": 2024
    }
  },
  {
    "_id": 32,
    "descr": "jeep gladiator sport 3.6",
    "model": {
      "_id": 7,
      "name": "jeep"
    },
    "makerId": 3,
    "details": {
      "mpg": 19,
      "cylinders": 6,
      "edispl": 220,
      "horsepower": 285,
      "weight": 4900,
      "accel": 7.5,
      "year": 2024
    }
  },
  {
    "_id": 33,
    "descr": "dodge durango r/t 5.7",
    "model": {
      "_id": 8,
      "name": "dodge"
    },
    "makerId": 3,
    "details": {
      "mpg": 17,
      "cylinders": 8,
      "edispl": 348,
      "horsepower": 360,
      "weight": 5250,
      "accel": 6.2,
      "year": 2024
    }
  },
  {
    "_id": 34,
    "descr": "dodge charger scat pack 6.4",
    "model": {
      "_id": 8,
      "name": "dodge"
    },
    "makerId": 3,
    "details": {
      "mpg": 18,
      "cylinders": 8,
      "edispl": 392,
      "horsepower": 485,
      "weight": 4300,
      "accel": 4.3,
      "year": 2023
    }
  },
  {
    "_id": 35,
    "descr": "dodge challenger srt hellcat 6.2",
    "model": {
      "_id": 8,
      "name": "dodge"
    },
    "makerId": 3,
    "details": {
      "mpg": 16,
      "cylinders": 8,
      "edispl": 376,
      "horsepower": 717,
      "weight": 4450,
      "accel": 3.6,
      "year": 2023
    }
  },
  {
    "_id": 36,
    "descr": "dodge hornet gt 2.0t",
    "model": {
      "_id": 8,
      "name": "dodge"
    },
    "makerId": 3,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 268,
      "weight": 3700,
      "accel": 6.5,
      "year": 2024
    }
  },
  {
    "_id": 37,
    "descr": "ram 1500 laramie 3.0 hurricane",
    "model": {
      "_id": 9,
      "name": "ram"
    },
    "makerId": 3,
    "details": {
      "mpg": 20,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 420,
      "weight": 5300,
      "accel": 5.8,
      "year": 2025
    }
  },
  {
    "_id": 38,
    "descr": "chrysler pacifica touring l 3.6",
    "model": {
      "_id": 10,
      "name": "chrysler"
    },
    "makerId": 3,
    "details": {
      "mpg": 22,
      "cylinders": 6,
      "edispl": 220,
      "horsepower": 287,
      "weight": 4500,
      "accel": 7.4,
      "year": 2024
    }
  },
  {
    "_id": 39,
    "descr": "fiat 500x sport 1.3t",
    "model": {
      "_id": 11,
      "name": "fiat"
    },
    "makerId": 3,
    "details": {
      "mpg": 27,
      "cylinders": 4,
      "edispl": 79,
      "horsepower": 177,
      "weight": 3300,
      "accel": 8.2,
      "year": 2023
    }
  },
  {
    "_id": 40,
    "descr": "peugeot 2008 gt 1.2t",
    "model": {
      "_id": 12,
      "name": "peugeot"
    },
    "makerId": 3,
    "details": {
      "mpg": 40,
      "cylinders": 3,
      "edispl": 73,
      "horsepower": 130,
      "weight": 2800,
      "accel": 8.7,
      "year": 2024
    }
  },
  {
    "_id": 41,
    "descr": "peugeot 3008 gt 1.6t",
    "model": {
      "_id": 12,
      "name": "peugeot"
    },
    "makerId": 3,
    "details": {
      "mpg": 32,
      "cylinders": 4,
      "edispl": 98,
      "horsepower": 165,
      "weight": 3200,
      "accel": 8.5,
      "year": 2024
    }
  },
  {
    "_id": 42,
    "descr": "alfa romeo giulia 2.0t",
    "model": {
      "_id": 13,
      "name": "alfa romeo"
    },
    "makerId": 3,
    "details": {
      "mpg": 27,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 280,
      "weight": 3500,
      "accel": 5.5,
      "year": 2024
    }
  },
  {
    "_id": 43,
    "descr": "alfa romeo stelvio quadrifoglio 2.9",
    "model": {
      "_id": 13,
      "name": "alfa romeo"
    },
    "makerId": 3,
    "details": {
      "mpg": 19,
      "cylinders": 6,
      "edispl": 177,
      "horsepower": 505,
      "weight": 4400,
      "accel": 3.6,
      "year": 2024
    }
  },
  {
    "_id": 44,
    "descr": "toyota corolla le 2.0",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 35,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 169,
      "weight": 3100,
      "accel": 8.3,
      "year": 2024
    }
  },
  {
    "_id": 45,
    "descr": "toyota corolla hybrid le 1.8",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 50,
      "cylinders": 4,
      "edispl": 110,
      "horsepower": 138,
      "weight": 3150,
      "accel": 9,
      "year": 2024
    }
  },
  {
    "_id": 46,
    "descr": "toyota camry le hybrid 2.5",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 51,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 225,
      "weight": 3500,
      "accel": 7.2,
      "year": 2025
    }
  },
  {
    "_id": 47,
    "descr": "toyota rav4 xle 2.5",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 30,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 203,
      "weight": 3500,
      "accel": 8,
      "year": 2024
    }
  },
  {
    "_id": 48,
    "descr": "toyota rav4 hybrid xle 2.5",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 40,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 219,
      "weight": 3800,
      "accel": 7.5,
      "year": 2024
    }
  },
  {
    "_id": 49,
    "descr": "toyota tacoma trd off-road 2.4t",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 20,
      "cylinders": 4,
      "edispl": 146,
      "horsepower": 278,
      "weight": 4500,
      "accel": 7,
      "year": 2024
    }
  },
  {
    "_id": 50,
    "descr": "toyota tundra limited 3.4",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 20,
      "cylinders": 6,
      "edispl": 210,
      "horsepower": 389,
      "weight": 5600,
      "accel": 6,
      "year": 2024
    }
  },
  {
    "_id": 51,
    "descr": "toyota 4runner sr5 2.4t",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 20,
      "cylinders": 4,
      "edispl": 146,
      "horsepower": 278,
      "weight": 4700,
      "accel": 7.5,
      "year": 2025
    }
  },
  {
    "_id": 52,
    "descr": "toyota gr86 2.4",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 146,
      "horsepower": 228,
      "weight": 2811,
      "accel": 6.1,
      "year": 2024
    }
  },
  {
    "_id": 53,
    "descr": "toyota gr supra 3.0",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 26,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 382,
      "weight": 3400,
      "accel": 3.9,
      "year": 2024
    }
  },
  {
    "_id": 54,
    "descr": "toyota hilux 2.7",
    "model": {
      "_id": 14,
      "name": "toyota"
    },
    "makerId": 4,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 165,
      "horsepower": 166,
      "weight": 4200,
      "accel": 11.5,
      "year": 2024
    }
  },
  {
    "_id": 55,
    "descr": "lexus rx 350 2.4t",
    "model": {
      "_id": 15,
      "name": "lexus"
    },
    "makerId": 4,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 146,
      "horsepower": 275,
      "weight": 4300,
      "accel": 7.2,
      "year": 2024
    }
  },
  {
    "_id": 56,
    "descr": "lexus es 300h 2.5",
    "model": {
      "_id": 15,
      "name": "lexus"
    },
    "makerId": 4,
    "details": {
      "mpg": 44,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 215,
      "weight": 3700,
      "accel": 8,
      "year": 2024
    }
  },
  {
    "_id": 57,
    "descr": "lexus lx 600 3.4",
    "model": {
      "_id": 15,
      "name": "lexus"
    },
    "makerId": 4,
    "details": {
      "mpg": 19,
      "cylinders": 6,
      "edispl": 210,
      "horsepower": 409,
      "weight": 5900,
      "accel": 6.8,
      "year": 2024
    }
  },
  {
    "_id": 58,
    "descr": "honda civic ex 1.5t",
    "model": {
      "_id": 16,
      "name": "honda"
    },
    "makerId": 5,
    "details": {
      "mpg": 36,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 180,
      "weight": 3000,
      "accel": 7.4,
      "year": 2024
    }
  },
  {
    "_id": 59,
    "descr": "honda civic type r 2.0t",
    "model": {
      "_id": 16,
      "name": "honda"
    },
    "makerId": 5,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 315,
      "weight": 3200,
      "accel": 5,
      "year": 2024
    }
  },
  {
    "_id": 60,
    "descr": "honda accord hybrid touring 2.0",
    "model": {
      "_id": 16,
      "name": "honda"
    },
    "makerId": 5,
    "details": {
      "mpg": 44,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 204,
      "weight": 3500,
      "accel": 6.9,
      "year": 2024
    }
  },
  {
    "_id": 61,
    "descr": "honda cr-v ex 1.5t",
    "model": {
      "_id": 16,
      "name": "honda"
    },
    "makerId": 5,
    "details": {
      "mpg": 30,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 190,
      "weight": 3500,
      "accel": 8.4,
      "year": 2024
    }
  },
  {
    "_id": 62,
    "descr": "honda hr-v lx 2.0",
    "model": {
      "_id": 16,
      "name": "honda"
    },
    "makerId": 5,
    "details": {
      "mpg": 28,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 158,
      "weight": 3100,
      "accel": 9.5,
      "year": 2024
    }
  },
  {
    "_id": 63,
    "descr": "honda pilot trailsport 3.5",
    "model": {
      "_id": 16,
      "name": "honda"
    },
    "makerId": 5,
    "details": {
      "mpg": 20,
      "cylinders": 6,
      "edispl": 214,
      "horsepower": 285,
      "weight": 4500,
      "accel": 7,
      "year": 2024
    }
  },
  {
    "_id": 64,
    "descr": "acura integra a-spec 1.5t",
    "model": {
      "_id": 17,
      "name": "acura"
    },
    "makerId": 5,
    "details": {
      "mpg": 33,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 200,
      "weight": 3100,
      "accel": 7,
      "year": 2024
    }
  },
  {
    "_id": 65,
    "descr": "acura mdx 3.5",
    "model": {
      "_id": 17,
      "name": "acura"
    },
    "makerId": 5,
    "details": {
      "mpg": 22,
      "cylinders": 6,
      "edispl": 214,
      "horsepower": 290,
      "weight": 4400,
      "accel": 6.5,
      "year": 2024
    }
  },
  {
    "_id": 66,
    "descr": "nissan versa sr 1.6",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 35,
      "cylinders": 4,
      "edispl": 98,
      "horsepower": 122,
      "weight": 2700,
      "accel": 9.5,
      "year": 2024
    }
  },
  {
    "_id": 67,
    "descr": "nissan sentra sv 2.0",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 34,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 149,
      "weight": 3050,
      "accel": 8.7,
      "year": 2024
    }
  },
  {
    "_id": 68,
    "descr": "nissan kicks sr 2.0",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 31,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 141,
      "weight": 3100,
      "accel": 9.5,
      "year": 2025
    }
  },
  {
    "_id": 69,
    "descr": "nissan rogue sv 1.5t",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 33,
      "cylinders": 3,
      "edispl": 91,
      "horsepower": 201,
      "weight": 3500,
      "accel": 7.8,
      "year": 2024
    }
  },
  {
    "_id": 70,
    "descr": "nissan frontier pro-4x 3.8",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 19,
      "cylinders": 6,
      "edispl": 232,
      "horsepower": 310,
      "weight": 4600,
      "accel": 6.8,
      "year": 2024
    }
  },
  {
    "_id": 71,
    "descr": "nissan z performance 3.0",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 22,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 400,
      "weight": 3500,
      "accel": 4.3,
      "year": 2024
    }
  },
  {
    "_id": 72,
    "descr": "nissan np300 2.5",
    "model": {
      "_id": 18,
      "name": "nissan"
    },
    "makerId": 6,
    "details": {
      "mpg": 23,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 164,
      "weight": 4000,
      "accel": 11,
      "year": 2024
    }
  },
  {
    "_id": 73,
    "descr": "infiniti qx60 2.0t",
    "model": {
      "_id": 19,
      "name": "infiniti"
    },
    "makerId": 6,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 268,
      "weight": 4600,
      "accel": 7,
      "year": 2025
    }
  },
  {
    "_id": 74,
    "descr": "mazda 3 hatchback 2.5 s",
    "model": {
      "_id": 20,
      "name": "mazda"
    },
    "makerId": 7,
    "details": {
      "mpg": 31,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 191,
      "weight": 3100,
      "accel": 7.5,
      "year": 2024
    }
  },
  {
    "_id": 75,
    "descr": "mazda cx-5 2.5 s",
    "model": {
      "_id": 20,
      "name": "mazda"
    },
    "makerId": 7,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 187,
      "weight": 3600,
      "accel": 8.2,
      "year": 2024
    }
  },
  {
    "_id": 76,
    "descr": "mazda cx-50 2.5 turbo",
    "model": {
      "_id": 20,
      "name": "mazda"
    },
    "makerId": 7,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 256,
      "weight": 3900,
      "accel": 6.6,
      "year": 2024
    }
  },
  {
    "_id": 77,
    "descr": "mazda cx-90 3.3 turbo",
    "model": {
      "_id": 20,
      "name": "mazda"
    },
    "makerId": 7,
    "details": {
      "mpg": 25,
      "cylinders": 6,
      "edispl": 201,
      "horsepower": 280,
      "weight": 4600,
      "accel": 6.8,
      "year": 2024
    }
  },
  {
    "_id": 78,
    "descr": "mazda mx-5 miata 2.0",
    "model": {
      "_id": 20,
      "name": "mazda"
    },
    "makerId": 7,
    "details": {
      "mpg": 30,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 181,
      "weight": 2350,
      "accel": 5.7,
      "year": 2024
    }
  },
  {
    "_id": 79,
    "descr": "subaru outback 2.5",
    "model": {
      "_id": 21,
      "name": "subaru"
    },
    "makerId": 8,
    "details": {
      "mpg": 29,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 182,
      "weight": 3700,
      "accel": 8.8,
      "year": 2024
    }
  },
  {
    "_id": 80,
    "descr": "subaru wrx 2.4t",
    "model": {
      "_id": 21,
      "name": "subaru"
    },
    "makerId": 8,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 146,
      "horsepower": 271,
      "weight": 3400,
      "accel": 5.5,
      "year": 2024
    }
  },
  {
    "_id": 81,
    "descr": "subaru forester 2.5",
    "model": {
      "_id": 21,
      "name": "subaru"
    },
    "makerId": 8,
    "details": {
      "mpg": 29,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 180,
      "weight": 3500,
      "accel": 8.5,
      "year": 2025
    }
  },
  {
    "_id": 82,
    "descr": "subaru crosstrek 2.5",
    "model": {
      "_id": 21,
      "name": "subaru"
    },
    "makerId": 8,
    "details": {
      "mpg": 29,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 182,
      "weight": 3300,
      "accel": 8.5,
      "year": 2024
    }
  },
  {
    "_id": 83,
    "descr": "mitsubishi outlander se 2.5",
    "model": {
      "_id": 22,
      "name": "mitsubishi"
    },
    "makerId": 9,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 181,
      "weight": 3600,
      "accel": 8.6,
      "year": 2024
    }
  },
  {
    "_id": 84,
    "descr": "mitsubishi mirage g4 1.2",
    "model": {
      "_id": 22,
      "name": "mitsubishi"
    },
    "makerId": 9,
    "details": {
      "mpg": 39,
      "cylinders": 3,
      "edispl": 73,
      "horsepower": 78,
      "weight": 2100,
      "accel": 11.5,
      "year": 2024
    }
  },
  {
    "_id": 85,
    "descr": "mitsubishi l200 2.4",
    "model": {
      "_id": 22,
      "name": "mitsubishi"
    },
    "makerId": 9,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 146,
      "horsepower": 181,
      "weight": 4300,
      "accel": 10.5,
      "year": 2024
    }
  },
  {
    "_id": 86,
    "descr": "suzuki swift 1.2",
    "model": {
      "_id": 23,
      "name": "suzuki"
    },
    "makerId": 10,
    "details": {
      "mpg": 44,
      "cylinders": 3,
      "edispl": 73,
      "horsepower": 81,
      "weight": 2100,
      "accel": 12,
      "year": 2024
    }
  },
  {
    "_id": 87,
    "descr": "suzuki vitara 1.4t",
    "model": {
      "_id": 23,
      "name": "suzuki"
    },
    "makerId": 10,
    "details": {
      "mpg": 36,
      "cylinders": 4,
      "edispl": 85,
      "horsepower": 138,
      "weight": 2750,
      "accel": 9.5,
      "year": 2024
    }
  },
  {
    "_id": 88,
    "descr": "suzuki jimny 1.5",
    "model": {
      "_id": 23,
      "name": "suzuki"
    },
    "makerId": 10,
    "details": {
      "mpg": 34,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 101,
      "weight": 2500,
      "accel": 12,
      "year": 2024
    }
  },
  {
    "_id": 89,
    "descr": "hyundai elantra sel 2.0",
    "model": {
      "_id": 24,
      "name": "hyundai"
    },
    "makerId": 11,
    "details": {
      "mpg": 36,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 147,
      "weight": 2900,
      "accel": 8.5,
      "year": 2024
    }
  },
  {
    "_id": 90,
    "descr": "hyundai elantra n 2.0t",
    "model": {
      "_id": 24,
      "name": "hyundai"
    },
    "makerId": 11,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 276,
      "weight": 3200,
      "accel": 5.3,
      "year": 2024
    }
  },
  {
    "_id": 91,
    "descr": "hyundai tucson sel 2.5",
    "model": {
      "_id": 24,
      "name": "hyundai"
    },
    "makerId": 11,
    "details": {
      "mpg": 28,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 187,
      "weight": 3500,
      "accel": 8.6,
      "year": 2024
    }
  },
  {
    "_id": 92,
    "descr": "hyundai santa fe 2.5t",
    "model": {
      "_id": 24,
      "name": "hyundai"
    },
    "makerId": 11,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 277,
      "weight": 4200,
      "accel": 6.5,
      "year": 2024
    }
  },
  {
    "_id": 93,
    "descr": "hyundai palisade 3.8",
    "model": {
      "_id": 24,
      "name": "hyundai"
    },
    "makerId": 11,
    "details": {
      "mpg": 22,
      "cylinders": 6,
      "edispl": 232,
      "horsepower": 291,
      "weight": 4300,
      "accel": 7.2,
      "year": 2024
    }
  },
  {
    "_id": 94,
    "descr": "hyundai creta 1.5",
    "model": {
      "_id": 24,
      "name": "hyundai"
    },
    "makerId": 11,
    "details": {
      "mpg": 35,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 113,
      "weight": 2700,
      "accel": 11.5,
      "year": 2024
    }
  },
  {
    "_id": 95,
    "descr": "kia forte lxs 2.0",
    "model": {
      "_id": 25,
      "name": "kia"
    },
    "makerId": 11,
    "details": {
      "mpg": 34,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 147,
      "weight": 2900,
      "accel": 8.6,
      "year": 2024
    }
  },
  {
    "_id": 96,
    "descr": "kia sportage lx 2.5",
    "model": {
      "_id": 25,
      "name": "kia"
    },
    "makerId": 11,
    "details": {
      "mpg": 28,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 187,
      "weight": 3500,
      "accel": 8.6,
      "year": 2024
    }
  },
  {
    "_id": 97,
    "descr": "kia telluride sx 3.8",
    "model": {
      "_id": 25,
      "name": "kia"
    },
    "makerId": 11,
    "details": {
      "mpg": 23,
      "cylinders": 6,
      "edispl": 232,
      "horsepower": 291,
      "weight": 4400,
      "accel": 7.1,
      "year": 2024
    }
  },
  {
    "_id": 98,
    "descr": "kia k5 gt 2.5t",
    "model": {
      "_id": 25,
      "name": "kia"
    },
    "makerId": 11,
    "details": {
      "mpg": 27,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 290,
      "weight": 3500,
      "accel": 5.5,
      "year": 2024
    }
  },
  {
    "_id": 99,
    "descr": "kia sorento 2.5",
    "model": {
      "_id": 25,
      "name": "kia"
    },
    "makerId": 11,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 191,
      "weight": 3900,
      "accel": 9,
      "year": 2024
    }
  },
  {
    "_id": 100,
    "descr": "genesis g70 3.3t",
    "model": {
      "_id": 26,
      "name": "genesis"
    },
    "makerId": 11,
    "details": {
      "mpg": 20,
      "cylinders": 6,
      "edispl": 201,
      "horsepower": 365,
      "weight": 3900,
      "accel": 4.5,
      "year": 2024
    }
  },
  {
    "_id": 101,
    "descr": "genesis gv80 2.5t",
    "model": {
      "_id": 26,
      "name": "genesis"
    },
    "makerId": 11,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 152,
      "horsepower": 300,
      "weight": 4700,
      "accel": 6,
      "year": 2024
    }
  },
  {
    "_id": 102,
    "descr": "volkswagen jetta se 1.5t",
    "model": {
      "_id": 27,
      "name": "volkswagen"
    },
    "makerId": 12,
    "details": {
      "mpg": 35,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 158,
      "weight": 3100,
      "accel": 8,
      "year": 2024
    }
  },
  {
    "_id": 103,
    "descr": "volkswagen golf gti 2.0t",
    "model": {
      "_id": 27,
      "name": "volkswagen"
    },
    "makerId": 12,
    "details": {
      "mpg": 28,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 241,
      "weight": 3200,
      "accel": 5.9,
      "year": 2024
    }
  },
  {
    "_id": 104,
    "descr": "volkswagen golf r 2.0t",
    "model": {
      "_id": 27,
      "name": "volkswagen"
    },
    "makerId": 12,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 315,
      "weight": 3500,
      "accel": 4.5,
      "year": 2024
    }
  },
  {
    "_id": 105,
    "descr": "volkswagen tiguan se 2.0t",
    "model": {
      "_id": 27,
      "name": "volkswagen"
    },
    "makerId": 12,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 184,
      "weight": 3800,
      "accel": 8.5,
      "year": 2024
    }
  },
  {
    "_id": 106,
    "descr": "volkswagen atlas 2.0t",
    "model": {
      "_id": 27,
      "name": "volkswagen"
    },
    "makerId": 12,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 269,
      "weight": 4500,
      "accel": 7,
      "year": 2024
    }
  },
  {
    "_id": 107,
    "descr": "volkswagen taos s 1.5t",
    "model": {
      "_id": 27,
      "name": "volkswagen"
    },
    "makerId": 12,
    "details": {
      "mpg": 31,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 158,
      "weight": 3200,
      "accel": 7.9,
      "year": 2024
    }
  },
  {
    "_id": 108,
    "descr": "audi a4 45 tfsi 2.0t",
    "model": {
      "_id": 28,
      "name": "audi"
    },
    "makerId": 12,
    "details": {
      "mpg": 27,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 261,
      "weight": 3700,
      "accel": 5.2,
      "year": 2024
    }
  },
  {
    "_id": 109,
    "descr": "audi q5 45 tfsi 2.0t",
    "model": {
      "_id": 28,
      "name": "audi"
    },
    "makerId": 12,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 261,
      "weight": 4100,
      "accel": 5.7,
      "year": 2024
    }
  },
  {
    "_id": 110,
    "descr": "audi rs 6 avant 4.0",
    "model": {
      "_id": 28,
      "name": "audi"
    },
    "makerId": 12,
    "details": {
      "mpg": 17,
      "cylinders": 8,
      "edispl": 244,
      "horsepower": 591,
      "weight": 4600,
      "accel": 3.5,
      "year": 2024
    }
  },
  {
    "_id": 111,
    "descr": "porsche 911 carrera 3.0",
    "model": {
      "_id": 29,
      "name": "porsche"
    },
    "makerId": 12,
    "details": {
      "mpg": 21,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 379,
      "weight": 3350,
      "accel": 3.9,
      "year": 2024
    }
  },
  {
    "_id": 112,
    "descr": "porsche cayenne 3.0",
    "model": {
      "_id": 29,
      "name": "porsche"
    },
    "makerId": 12,
    "details": {
      "mpg": 21,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 348,
      "weight": 4600,
      "accel": 5.7,
      "year": 2024
    }
  },
  {
    "_id": 113,
    "descr": "porsche macan t 2.0t",
    "model": {
      "_id": 29,
      "name": "porsche"
    },
    "makerId": 12,
    "details": {
      "mpg": 21,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 261,
      "weight": 4100,
      "accel": 5.9,
      "year": 2024
    }
  },
  {
    "_id": 114,
    "descr": "bmw 330i 2.0t",
    "model": {
      "_id": 32,
      "name": "bmw"
    },
    "makerId": 13,
    "details": {
      "mpg": 30,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 255,
      "weight": 3600,
      "accel": 5.6,
      "year": 2024
    }
  },
  {
    "_id": 115,
    "descr": "bmw m3 competition 3.0",
    "model": {
      "_id": 32,
      "name": "bmw"
    },
    "makerId": 13,
    "details": {
      "mpg": 19,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 503,
      "weight": 3900,
      "accel": 3.8,
      "year": 2024
    }
  },
  {
    "_id": 116,
    "descr": "bmw x3 xdrive30i 2.0t",
    "model": {
      "_id": 32,
      "name": "bmw"
    },
    "makerId": 13,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 255,
      "weight": 4200,
      "accel": 6,
      "year": 2025
    }
  },
  {
    "_id": 117,
    "descr": "bmw x5 xdrive40i 3.0",
    "model": {
      "_id": 32,
      "name": "bmw"
    },
    "makerId": 13,
    "details": {
      "mpg": 24,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 375,
      "weight": 4900,
      "accel": 5.3,
      "year": 2024
    }
  },
  {
    "_id": 118,
    "descr": "mini cooper s 2.0t",
    "model": {
      "_id": 33,
      "name": "mini"
    },
    "makerId": 13,
    "details": {
      "mpg": 31,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 201,
      "weight": 2900,
      "accel": 6.4,
      "year": 2025
    }
  },
  {
    "_id": 119,
    "descr": "mercedes-benz c 300 2.0t",
    "model": {
      "_id": 34,
      "name": "mercedes-benz"
    },
    "makerId": 14,
    "details": {
      "mpg": 29,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 255,
      "weight": 3800,
      "accel": 5.9,
      "year": 2024
    }
  },
  {
    "_id": 120,
    "descr": "mercedes-benz e 350 2.0t",
    "model": {
      "_id": 34,
      "name": "mercedes-benz"
    },
    "makerId": 14,
    "details": {
      "mpg": 27,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 255,
      "weight": 4100,
      "accel": 6.2,
      "year": 2024
    }
  },
  {
    "_id": 121,
    "descr": "mercedes-benz glc 300 2.0t",
    "model": {
      "_id": 34,
      "name": "mercedes-benz"
    },
    "makerId": 14,
    "details": {
      "mpg": 26,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 255,
      "weight": 4300,
      "accel": 6.2,
      "year": 2024
    }
  },
  {
    "_id": 122,
    "descr": "mercedes-benz amg g 63 4.0",
    "model": {
      "_id": 34,
      "name": "mercedes-benz"
    },
    "makerId": 14,
    "details": {
      "mpg": 14,
      "cylinders": 8,
      "edispl": 244,
      "horsepower": 577,
      "weight": 5800,
      "accel": 4.4,
      "year": 2024
    }
  },
  {
    "_id": 123,
    "descr": "renault duster 1.6",
    "model": {
      "_id": 35,
      "name": "renault"
    },
    "makerId": 15,
    "details": {
      "mpg": 32,
      "cylinders": 4,
      "edispl": 98,
      "horsepower": 113,
      "weight": 2600,
      "accel": 12,
      "year": 2024
    }
  },
  {
    "_id": 124,
    "descr": "renault kardian 1.0t",
    "model": {
      "_id": 35,
      "name": "renault"
    },
    "makerId": 15,
    "details": {
      "mpg": 40,
      "cylinders": 3,
      "edispl": 61,
      "horsepower": 99,
      "weight": 2600,
      "accel": 11,
      "year": 2025
    }
  },
  {
    "_id": 125,
    "descr": "volvo xc60 b5 2.0t",
    "model": {
      "_id": 37,
      "name": "volvo"
    },
    "makerId": 16,
    "details": {
      "mpg": 25,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 247,
      "weight": 4200,
      "accel": 6.4,
      "year": 2024
    }
  },
  {
    "_id": 126,
    "descr": "volvo xc90 b6 2.0t",
    "model": {
      "_id": 37,
      "name": "volvo"
    },
    "makerId": 16,
    "details": {
      "mpg": 22,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 295,
      "weight": 4700,
      "accel": 6.1,
      "year": 2024
    }
  },
  {
    "_id": 127,
    "descr": "volvo s60 b5 2.0t",
    "model": {
      "_id": 37,
      "name": "volvo"
    },
    "makerId": 16,
    "details": {
      "mpg": 28,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 247,
      "weight": 3700,
      "accel": 6.3,
      "year": 2024
    }
  },
  {
    "_id": 128,
    "descr": "land rover defender 110 3.0",
    "model": {
      "_id": 38,
      "name": "land rover"
    },
    "makerId": 17,
    "details": {
      "mpg": 18,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 395,
      "weight": 5100,
      "accel": 5.7,
      "year": 2024
    }
  },
  {
    "_id": 129,
    "descr": "land rover range rover sport 3.0",
    "model": {
      "_id": 38,
      "name": "land rover"
    },
    "makerId": 17,
    "details": {
      "mpg": 20,
      "cylinders": 6,
      "edispl": 183,
      "horsepower": 355,
      "weight": 5000,
      "accel": 5.7,
      "year": 2024
    }
  },
  {
    "_id": 130,
    "descr": "jaguar f-pace p250 2.0t",
    "model": {
      "_id": 39,
      "name": "jaguar"
    },
    "makerId": 17,
    "details": {
      "mpg": 24,
      "cylinders": 4,
      "edispl": 122,
      "horsepower": 246,
      "weight": 4100,
      "accel": 6.9,
      "year": 2024
    }
  },
  {
    "_id": 131,
    "descr": "jaguar f-type r 5.0",
    "model": {
      "_id": 39,
      "name": "jaguar"
    },
    "makerId": 17,
    "details": {
      "mpg": 18,
      "cylinders": 8,
      "edispl": 305,
      "horsepower": 575,
      "weight": 3900,
      "accel": 3.5,
      "year": 2024
    }
  },
  {
    "_id": 132,
    "descr": "ferrari roma 3.9",
    "model": {
      "_id": 40,
      "name": "ferrari"
    },
    "makerId": 18,
    "details": {
      "mpg": 17,
      "cylinders": 8,
      "edispl": 238,
      "horsepower": 612,
      "weight": 3460,
      "accel": 3.4,
      "year": 2024
    }
  },
  {
    "_id": 133,
    "descr": "ferrari 812 competizione 6.5",
    "model": {
      "_id": 40,
      "name": "ferrari"
    },
    "makerId": 18,
    "details": {
      "mpg": 14,
      "cylinders": 12,
      "edispl": 397,
      "horsepower": 819,
      "weight": 3600,
      "accel": 2.8,
      "year": 2023
    }
  },
  {
    "_id": 134,
    "descr": "mg zs 1.5",
    "model": {
      "_id": 41,
      "name": "mg"
    },
    "makerId": 19,
    "details": {
      "mpg": 34,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 106,
      "weight": 2900,
      "accel": 12,
      "year": 2024
    }
  },
  {
    "_id": 135,
    "descr": "mg 5 1.5",
    "model": {
      "_id": 41,
      "name": "mg"
    },
    "makerId": 19,
    "details": {
      "mpg": 38,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 111,
      "weight": 2700,
      "accel": 11.5,
      "year": 2024
    }
  },
  {
    "_id": 136,
    "descr": "mg hs 1.5t",
    "model": {
      "_id": 41,
      "name": "mg"
    },
    "makerId": 19,
    "details": {
      "mpg": 30,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 168,
      "weight": 3400,
      "accel": 9.5,
      "year": 2024
    }
  },
  {
    "_id": 137,
    "descr": "chery tiggo 4 pro 1.5",
    "model": {
      "_id": 42,
      "name": "chery"
    },
    "makerId": 20,
    "details": {
      "mpg": 30,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 113,
      "weight": 3000,
      "accel": 12,
      "year": 2024
    }
  },
  {
    "_id": 138,
    "descr": "chery tiggo 7 pro 1.5t",
    "model": {
      "_id": 42,
      "name": "chery"
    },
    "makerId": 20,
    "details": {
      "mpg": 28,
      "cylinders": 4,
      "edispl": 91,
      "horsepower": 154,
      "weight": 3300,
      "accel": 10,
      "year": 2024
    }
  }
]);
db.cars.createIndex({
  "makerId": 1
}, {});
db.cars.createIndex({
  "model._id": 1
}, {});

