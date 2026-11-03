// Consultas sobre la base de datos autos (Aggregation Framework)
// Generado por scripts/export_queries.py desde app/modules/queries/catalog.py

db = db.getSiblingDB("autos");

// 1. Obtener los autos de modelo 2024 en adelante con rendimiento de al menos 35 mpg. Mostrar
//    solo la descripción, el año y el rendimiento, ordenados de mayor a menor rendimiento.
db.cars.aggregate([
  {
    $match: {
      "details.year": { $gte: 2024 },
      "details.mpg": { $gte: 35 }
    }
  },
  {
    $project: {
      _id: 0,
      descr: 1,
      year: "$details.year",
      mpg: "$details.mpg"
    }
  },
  { $sort: { mpg: -1, descr: 1 } }
]);

// 2. Listar los autos de fabricantes europeos con motor de 4 cilindros y al menos 250 hp,
//    mostrando descripción, país y potencia, ordenados por potencia descendente.
db.cars.aggregate([
  {
    $match: {
      "details.cylinders": 4,
      "details.horsepower": { $gte: 250 }
    }
  },
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  { $match: { "maker.country.continent.name": "europe" } },
  {
    $project: {
      _id: 0,
      descr: 1,
      country: "$maker.country.name",
      horsepower: "$details.horsepower"
    }
  },
  { $sort: { horsepower: -1, descr: 1 } }
]);

// 3. Contar cuántos autos de fabricantes japoneses tienen motor turbo, es decir, cuya
//    descripción termina con la cilindrada seguida de "t" (por ejemplo "1.5t").
db.cars.aggregate([
  { $match: { descr: { $regex: "\\d\\.\\dt$" } } },
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  { $match: { "maker.country.name": "japan" } },
  { $count: "turbosJaponeses" }
]);

// 4. Encontrar los autos que cumplan cualquiera de estas condiciones: (a) pesan menos de 3000
//    lb y aceleran de 0 a 60 mph en menos de 9 s, o (b) tienen 8 o más cilindros y rinden al
//    menos 19 mpg.
db.cars.aggregate([
  {
    $match: {
      $or: [
        {
          "details.weight": { $lt: 3000 },
          "details.accel": { $lt: 9 }
        },
        {
          "details.cylinders": { $gte: 8 },
          "details.mpg": { $gte: 19 }
        }
      ]
    }
  },
  {
    $project: {
      _id: 0,
      descr: 1,
      weight: "$details.weight",
      accel: "$details.accel",
      cylinders: "$details.cylinders",
      mpg: "$details.mpg"
    }
  },
  { $sort: { descr: 1 } }
]);

// 5. Obtener los fabricantes que comercializan más de una marca o línea de modelo, mostrando
//    nombre, país y modelos.
db.makers.aggregate([
  { $match: { "models.1": { $exists: true } } },
  {
    $project: {
      _id: 0,
      name: 1,
      country: "$country.name",
      models: "$models.name"
    }
  },
  { $sort: { name: 1 } }
]);

// 6. Encontrar los autos cuya marca (model.name) es distinta del nombre de su grupo
//    fabricante (maker.name). Mostrar descripción, marca y fabricante.
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  { $match: { $expr: { $ne: ["$model.name", "$maker.name"] } } },
  {
    $project: {
      _id: 0,
      descr: 1,
      marca: "$model.name",
      fabricante: "$maker.name"
    }
  },
  { $sort: { fabricante: 1, descr: 1 } }
]);

// 7. Calcular por país el número de autos, el rendimiento promedio y la potencia promedio
//    (redondeados a 1 decimal), ordenado por número de autos.
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $group: {
      _id: "$maker.country.name",
      autos: { $sum: 1 },
      mpg: { $avg: "$details.mpg" },
      hp: { $avg: "$details.horsepower" }
    }
  },
  {
    $project: {
      _id: 0,
      pais: "$_id",
      autos: 1,
      mpgPromedio: { $round: ["$mpg", 1] },
      hpPromedio: { $round: ["$hp", 1] }
    }
  },
  { $sort: { autos: -1, pais: 1 } }
]);

// 8. Calcular para cada grupo fabricante el número de autos, el número de marcas distintas
//    con autos registrados y la potencia promedio (redondeada a 1 decimal), ordenado por
//    número de autos.
db.cars.aggregate([
  {
    $group: {
      _id: "$makerId",
      autos: { $sum: 1 },
      marcas: { $addToSet: "$model._id" },
      hp: { $avg: "$details.horsepower" }
    }
  },
  {
    $lookup: {
      from: "makers",
      localField: "_id",
      foreignField: "_id",
      as: "maker"
    }
  },
  {
    $project: {
      _id: 0,
      fabricante: { $first: "$maker.name" },
      autos: 1,
      marcas: { $size: "$marcas" },
      hpPromedio: { $round: ["$hp", 1] }
    }
  },
  { $sort: { autos: -1, fabricante: 1 } }
]);

// 9. Contar cuántos modelos (marcas) hay por continente.
db.continents.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "_id",
      foreignField: "country.continent._id",
      as: "makers"
    }
  },
  {
    $project: {
      _id: 0,
      continente: "$name",
      marcas: {
        $sum: {
          $map: {
            input: "$makers",
            in: { $size: "$$this.models" }
          }
        }
      }
    }
  },
  { $sort: { marcas: -1, continente: 1 } }
]);

// 10. Clasificar los autos en rangos de rendimiento [0,20), [20,25), [25,30), [30,35), [35,40)
//    y 40 o más, contando cuántos hay en cada rango y su peso promedio.
db.cars.aggregate([
  {
    $bucket: {
      groupBy: "$details.mpg",
      boundaries: [0, 20, 25, 30, 35, 40],
      default: "40 o más",
      output: {
        autos: { $sum: 1 },
        peso: { $avg: "$details.weight" }
      }
    }
  },
  {
    $project: {
      _id: 0,
      rango: {
        $cond: [
          { $eq: [{ $type: "$_id" }, "string"] },
          "$_id",
          {
            $concat: [
              "[",
              { $toString: "$_id" },
              ", ",
              {
                $toString: {
                  $add: [
                    "$_id",
                    {
                      $cond: [
                        {
                          $eq: [
                            "$_id",
                            0
                          ]
                        },
                        20,
                        5
                      ]
                    }
                  ]
                }
              },
              ")"
            ]
          }
        ]
      },
      autos: 1,
      pesoPromedio: { $round: ["$peso", 1] }
    }
  }
]);

// 11. Obtener los 5 fabricantes con mayor rendimiento promedio, considerando solo aquellos con
//    al menos 8 autos registrados.
db.cars.aggregate([
  {
    $group: {
      _id: "$makerId",
      autos: { $sum: 1 },
      mpg: { $avg: "$details.mpg" }
    }
  },
  { $match: { autos: { $gte: 8 } } },
  { $sort: { mpg: -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "makers",
      localField: "_id",
      foreignField: "_id",
      as: "maker"
    }
  },
  {
    $project: {
      _id: 0,
      fabricante: { $first: "$maker.name" },
      autos: 1,
      mpgPromedio: { $round: ["$mpg", 1] }
    }
  }
]);

// 12. Clasificar cada auto como "Alta" (mpg ≥ 30), "Media" (20 ≤ mpg < 30) o "Baja" (mpg < 20)
//    y contar cuántos autos hay por continente y categoría.
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $set: {
      categoria: {
        $switch: {
          branches: [
            {
              case: {
                $gte: [
                  "$details.mpg",
                  30
                ]
              },
              then: "Alta"
            },
            {
              case: {
                $gte: [
                  "$details.mpg",
                  20
                ]
              },
              then: "Media"
            }
          ],
          default: "Baja"
        }
      }
    }
  },
  {
    $group: {
      _id: {
        continente: "$maker.country.continent.name",
        categoria: "$categoria"
      },
      autos: { $sum: 1 }
    }
  },
  {
    $project: {
      _id: 0,
      continente: "$_id.continente",
      categoria: "$_id.categoria",
      autos: 1
    }
  },
  { $sort: { continente: 1, categoria: 1 } }
]);

// 13. Desde la colección makers, obtener cuántos autos tiene registrados cada fabricante
//    (incluidos los que tienen cero).
db.makers.aggregate([
  {
    $lookup: {
      from: "cars",
      localField: "_id",
      foreignField: "makerId",
      as: "autos"
    }
  },
  {
    $project: {
      _id: 0,
      fabricante: "$name",
      autos: { $size: "$autos" }
    }
  },
  { $sort: { autos: -1, fabricante: 1 } }
]);

// 14. Encontrar los modelos del catálogo que no tienen ningún auto registrado.
db.makers.aggregate([
  { $unwind: "$models" },
  {
    $lookup: {
      from: "cars",
      localField: "models._id",
      foreignField: "model._id",
      as: "autos"
    }
  },
  { $match: { autos: { $size: 0 } } },
  { $project: { _id: 0, modelo: "$models.name", fabricante: "$name" } }
]);

// 15. Para los 5 autos más potentes, obtener su descripción, potencia y el nombre completo
//    (fullName) de su fabricante.
db.cars.aggregate([
  { $sort: { "details.horsepower": -1 } },
  { $limit: 5 },
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $project: {
      _id: 0,
      descr: 1,
      horsepower: "$details.horsepower",
      fabricante: "$maker.fullName"
    }
  }
]);

// 16. Obtener, para cada continente, los 3 autos con mayor rendimiento (descripción y mpg).
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $group: {
      _id: "$maker.country.continent.name",
      autos: {
        $topN: {
          n: 3,
          sortBy: { "details.mpg": -1, descr: 1 },
          output: {
            descr: "$descr",
            mpg: "$details.mpg"
          }
        }
      }
    }
  },
  { $project: { _id: 0, continente: "$_id", autos: 1 } },
  { $sort: { continente: 1 } }
]);

// 17. Para cada fabricante con más de un modelo, determinar cuál de sus modelos tiene más
//    autos registrados.
db.makers.aggregate([
  { $match: { "models.1": { $exists: true } } },
  { $unwind: "$models" },
  {
    $lookup: {
      from: "cars",
      localField: "models._id",
      foreignField: "model._id",
      as: "autos"
    }
  },
  { $set: { autos: { $size: "$autos" } } },
  {
    $group: {
      _id: "$name",
      top: {
        $top: {
          sortBy: { autos: -1, "models.name": 1 },
          output: {
            modelo: "$models.name",
            autos: "$autos"
          }
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      fabricante: "$_id",
      modelo: "$top.modelo",
      autos: "$top.autos"
    }
  },
  { $sort: { fabricante: 1 } }
]);

// 18. Calcular el porcentaje que representa cada continente sobre el total de autos, con 2
//    decimales.
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $group: { _id: "$maker.country.continent.name", autos: { $sum: 1 } }
  },
  {
    $setWindowFields: {
      output: {
        total: {
          $sum: "$autos",
          window: {
            documents: [
              "unbounded",
              "unbounded"
            ]
          }
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      continente: "$_id",
      autos: 1,
      porcentaje: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  "$autos",
                  "$total"
                ]
              },
              100
            ]
          },
          2
        ]
      }
    }
  },
  { $sort: { porcentaje: -1 } }
]);

// 19. Listar los 5 autos que más superan el rendimiento promedio de los autos con su mismo
//    número de cilindros, mostrando ese promedio y la diferencia.
db.cars.aggregate([
  {
    $setWindowFields: {
      partitionBy: "$details.cylinders",
      output: {
        promedio: {
          $avg: "$details.mpg",
          window: {
            documents: [
              "unbounded",
              "unbounded"
            ]
          }
        }
      }
    }
  },
  { $set: { diferencia: { $subtract: ["$details.mpg", "$promedio"] } } },
  { $sort: { diferencia: -1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      descr: 1,
      cylinders: "$details.cylinders",
      mpg: "$details.mpg",
      promedio: { $round: ["$promedio", 2] },
      diferencia: { $round: ["$diferencia", 2] }
    }
  }
]);

// 20. Calcular, por continente, el número de autos, cuántos tienen 8 o más cilindros y el
//    porcentaje que representan (1 decimal).
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $group: {
      _id: "$maker.country.continent.name",
      autos: { $sum: 1 },
      ochoOMas: {
        $sum: {
          $cond: [
            {
              $gte: [
                "$details.cylinders",
                8
              ]
            },
            1,
            0
          ]
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      continente: "$_id",
      autos: 1,
      ochoOMas: 1,
      porcentaje: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  "$ochoOMas",
                  "$autos"
                ]
              },
              100
            ]
          },
          1
        ]
      }
    }
  },
  { $sort: { autos: -1 } }
]);

// 21. Calcular la potencia por cada 1000 lb de peso y mostrar los 10 autos con mayor valor,
//    junto con su país.
db.cars.aggregate([
  {
    $set: {
      hpPor1000lb: {
        $round: [
          {
            $multiply: [
              {
                $divide: [
                  "$details.horsepower",
                  "$details.weight"
                ]
              },
              1000
            ]
          },
          1
        ]
      }
    }
  },
  { $sort: { hpPor1000lb: -1 } },
  { $limit: 10 },
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  {
    $project: {
      _id: 0,
      descr: 1,
      hpPor1000lb: 1,
      pais: "$maker.country.name"
    }
  }
]);

// 22. Para cada fabricante, mostrar solo los modelos cuyo nombre es distinto al nombre del
//    fabricante, descartando a los fabricantes que no tengan ninguno.
db.makers.aggregate([
  {
    $project: {
      _id: 0,
      fabricante: "$name",
      modelos: {
        $map: {
          input: {
            $filter: {
              input: "$models",
              cond: {
                $ne: [
                  "$$this.name",
                  "$name"
                ]
              }
            }
          },
          in: "$$this.name"
        }
      }
    }
  },
  { $match: { "modelos.0": { $exists: true } } },
  { $sort: { fabricante: 1 } }
]);

// 23. En una sola consulta, obtener: (a) el número de autos por continente, (b) el número de
//    autos por cilindros y (c) las estadísticas globales de mpg (mínimo, máximo y promedio).
db.cars.aggregate([
  {
    $facet: {
      porContinente: [
        {
          $lookup: {
            from: "makers",
            localField: "makerId",
            foreignField: "_id",
            as: "maker"
          }
        },
        { $unwind: "$maker" },
        {
          $group: {
            _id: "$maker.country.continent.name",
            autos: { $sum: 1 }
          }
        },
        { $sort: { autos: -1 } }
      ],
      porCilindros: [
        {
          $group: {
            _id: "$details.cylinders",
            autos: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ],
      mpgGlobal: [
        {
          $group: {
            _id: null,
            minimo: { $min: "$details.mpg" },
            maximo: { $max: "$details.mpg" },
            promedio: {
              $avg: "$details.mpg"
            }
          }
        },
        {
          $project: {
            _id: 0,
            minimo: 1,
            maximo: 1,
            promedio: {
              $round: [
                "$promedio",
                2
              ]
            }
          }
        }
      ]
    }
  }
]);

// 24. Asignar a cada auto alemán su posición por potencia dentro de su país y mostrar los 5
//    primeros.
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  { $match: { "maker.country.name": "germany" } },
  {
    $setWindowFields: {
      partitionBy: "$maker.country.name",
      sortBy: { "details.horsepower": -1 },
      output: { posicion: { $rank: {} } }
    }
  },
  { $sort: { posicion: 1, descr: 1 } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      posicion: 1,
      descr: 1,
      horsepower: "$details.horsepower"
    }
  }
]);

// 25. Obtener para cada fabricante europeo su auto más eficiente.
db.cars.aggregate([
  {
    $lookup: {
      from: "makers",
      localField: "makerId",
      foreignField: "_id",
      as: "maker"
    }
  },
  { $unwind: "$maker" },
  { $match: { "maker.country.continent.name": "europe" } },
  {
    $group: {
      _id: "$maker.name",
      auto: {
        $top: {
          sortBy: { "details.mpg": -1, descr: 1 },
          output: {
            descr: "$descr",
            mpg: "$details.mpg"
          }
        }
      }
    }
  },
  {
    $project: {
      _id: 0,
      fabricante: "$_id",
      descr: "$auto.descr",
      mpg: "$auto.mpg"
    }
  },
  { $sort: { fabricante: 1 } }
]);
