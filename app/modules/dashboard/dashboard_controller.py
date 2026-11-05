from flask import Blueprint, redirect, render_template, url_for

from app.modules.dashboard.dashboard_service import DashboardService

dashboard = Blueprint("dashboard", __name__)
service = DashboardService()


@dashboard.get("/")
def index():
    rows = service.collection_stats()
    return render_template(
        "dashboard/index.html", section="summary", rows=rows,
        total_documents=sum(row["documents"] for row in rows),
        total_indexes=sum(row["indexes"] for row in rows),
        total_size=round(sum(row["size_kb"] for row in rows), 1))


@dashboard.get("/queries")
def queries():
    return redirect(url_for("cars.query1"))
