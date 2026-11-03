"""Queries use cases: list, show and run the 25 required queries."""
import json
from time import perf_counter

from app.core import mongosh
from app.core.exceptions import AppError

from . import repository
from .catalog import BY_NUMBER, QUERIES, Query
from .dto import QueryDetailDto, QueryResultDto, QuerySummaryDto


def list_all() -> list[QuerySummaryDto]:
    return [QuerySummaryDto(q.number, q.title, q.collection) for q in QUERIES]


def get_or_fail(number: int) -> QueryDetailDto:
    query = _find(number)
    return QueryDetailDto(
        number=query.number, title=query.title, collection=query.collection,
        statement=query.statement, code=code_of(query), note=query.note)


def code_of(query: Query) -> str:
    return mongosh.call(query.collection, "aggregate", query.pipeline, width=72) + ";"


def run(number: int) -> QueryResultDto:
    query = _find(number)
    started = perf_counter()
    try:
        documents = repository.aggregate(query.collection, query.pipeline)
    except AppError as error:
        return QueryResultDto([], [], [], [], "", 0, error=error.message)
    elapsed = (perf_counter() - started) * 1000

    columns, rows = _as_table(documents)
    return QueryResultDto(
        documents=documents, columns=columns, numeric=_numeric(rows, len(columns)), rows=rows,
        json=json.dumps(documents, ensure_ascii=False, indent=2, default=str),
        elapsed_ms=round(elapsed, 1), stages=len(query.pipeline))


def _find(number: int) -> Query:
    query = BY_NUMBER.get(number)
    if query is None:
        raise AppError(f"La consulta {number} no existe. Elige una del 1 al 25.")
    return query


def _as_table(documents: list[dict]) -> tuple[list[str], list[list[str]]]:
    """Flatten nested documents into dotted columns; arrays stay as text."""
    flat = [_flatten(doc) for doc in documents]
    columns: list[str] = []
    for row in flat:
        columns += [key for key in row if key not in columns]
    return columns, [[row.get(column, "") for column in columns] for row in flat]


def _numeric(rows: list[list[str]], width: int) -> list[bool]:
    """A column is numeric when every filled cell parses as a number."""
    def is_number(cell: str) -> bool:
        try:
            float(cell)
            return True
        except ValueError:
            return False
    return [all(is_number(row[i]) for row in rows if row[i] != "") and any(row[i] for row in rows)
            for i in range(width)]


def _flatten(value, prefix: str = "") -> dict[str, str]:
    if isinstance(value, dict) and value:
        out: dict[str, str] = {}
        for key, item in value.items():
            out.update(_flatten(item, f"{prefix}.{key}" if prefix else key))
        return out
    return {prefix: _cell(value)}


def _cell(value) -> str:
    if isinstance(value, list):
        if all(not isinstance(item, (dict, list)) for item in value):
            return ", ".join(_cell(item) for item in value)
        # One line per embedded document, its values separated by " / ".
        return "\n".join(
            " / ".join(_cell(v) for v in item.values()) if isinstance(item, dict) else _cell(item)
            for item in value)
    if value is None:
        return "null"
    if isinstance(value, float):
        return f"{value:g}" if value.is_integer() else f"{value}"
    return str(value)
