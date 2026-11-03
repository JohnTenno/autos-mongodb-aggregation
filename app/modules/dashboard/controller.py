"""HTTP routes for the overview page."""
from flask import Blueprint, render_template

from . import service

blueprint = Blueprint("dashboard", __name__)


@blueprint.get("/")
def index():
    rows = service.collection_stats()
    return render_template(
        "dashboard/index.html", section="resumen", rows=rows,
        total_documents=sum(row.documents for row in rows),
        total_indexes=sum(row.indexes for row in rows),
        total_size=round(sum(row.size_kb for row in rows), 1))
