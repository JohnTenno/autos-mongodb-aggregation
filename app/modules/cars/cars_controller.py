from flask import Blueprint, render_template

from app.modules.cars.cars_service import CarsService

cars = Blueprint("cars", __name__, url_prefix="/cars")
service = CarsService()


@cars.get("/queries/1")
def query1():
    pipeline, result = service.query1()
    return render_template("query.html", number=1, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/2")
def query2():
    pipeline, result = service.query2()
    return render_template("query.html", number=2, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/3")
def query3():
    pipeline, result = service.query3()
    return render_template("query.html", number=3, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/4")
def query4():
    pipeline, result = service.query4()
    return render_template("query.html", number=4, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/6")
def query6():
    pipeline, result = service.query6()
    return render_template("query.html", number=6, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/7")
def query7():
    pipeline, result = service.query7()
    return render_template("query.html", number=7, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/8")
def query8():
    pipeline, result = service.query8()
    return render_template("query.html", number=8, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/10")
def query10():
    pipeline, result = service.query10()
    return render_template("query.html", number=10, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/11")
def query11():
    pipeline, result = service.query11()
    return render_template("query.html", number=11, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/12")
def query12():
    pipeline, result = service.query12()
    return render_template("query.html", number=12, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/15")
def query15():
    pipeline, result = service.query15()
    return render_template("query.html", number=15, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/16")
def query16():
    pipeline, result = service.query16()
    return render_template("query.html", number=16, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/18")
def query18():
    pipeline, result = service.query18()
    return render_template("query.html", number=18, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/19")
def query19():
    pipeline, result = service.query19()
    return render_template("query.html", number=19, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/20")
def query20():
    pipeline, result = service.query20()
    return render_template("query.html", number=20, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/21")
def query21():
    pipeline, result = service.query21()
    return render_template("query.html", number=21, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/23")
def query23():
    pipeline, result = service.query23()
    return render_template("query.html", number=23, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/24")
def query24():
    pipeline, result = service.query24()
    return render_template("query.html", number=24, collection="cars",
                           pipeline=pipeline, result=result)


@cars.get("/queries/25")
def query25():
    pipeline, result = service.query25()
    return render_template("query.html", number=25, collection="cars",
                           pipeline=pipeline, result=result)
