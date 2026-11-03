"""HTTP routes for /consultas."""
from flask import Blueprint, render_template, request

from . import service

blueprint = Blueprint("queries", __name__, url_prefix="/consultas")


@blueprint.get("/")
@blueprint.get("/<int:number>")
def index(number: int = 1):
    """Query list beside the selected query; ?ver=json switches the result view."""
    result = service.run(number) if request.args.get("ejecutar") else None
    return render_template(
        "queries/index.html",
        section="consultas",
        queries=service.list_all(),
        query=service.get_or_fail(number),
        result=result,
        view="json" if request.args.get("ver") == "json" else "tabla",
    )
