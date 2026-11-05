from flask import Blueprint, render_template

from app.modules.makers.makers_service import MakersService

makers = Blueprint("makers", __name__, url_prefix="/makers")
service = MakersService()


@makers.get("/queries/5")
def query5():
    pipeline, result = service.query5()
    return render_template("query.html", number=5, collection="makers",
                           pipeline=pipeline, result=result)


@makers.get("/queries/13")
def query13():
    pipeline, result = service.query13()
    return render_template("query.html", number=13, collection="makers",
                           pipeline=pipeline, result=result)


@makers.get("/queries/14")
def query14():
    pipeline, result = service.query14()
    return render_template("query.html", number=14, collection="makers",
                           pipeline=pipeline, result=result)


@makers.get("/queries/17")
def query17():
    pipeline, result = service.query17()
    return render_template("query.html", number=17, collection="makers",
                           pipeline=pipeline, result=result)


@makers.get("/queries/22")
def query22():
    pipeline, result = service.query22()
    return render_template("query.html", number=22, collection="makers",
                           pipeline=pipeline, result=result)
