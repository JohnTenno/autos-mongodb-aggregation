from flask import Blueprint, render_template

from app.modules.continents.continents_service import ContinentsService

continents = Blueprint("continents", __name__, url_prefix="/continents")
service = ContinentsService()


@continents.get("/queries/9")
def query9():
    pipeline, result = service.query9()
    return render_template("query.html", number=9, collection="continents",
                           pipeline=pipeline, result=result)
