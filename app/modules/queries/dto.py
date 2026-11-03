"""Shapes travelling out of the queries module."""
from dataclasses import dataclass


@dataclass(frozen=True)
class QuerySummaryDto:
    """One entry of the query list."""

    number: int
    title: str
    collection: str


@dataclass(frozen=True)
class QueryDetailDto(QuerySummaryDto):
    """A query as shown on its page: statement plus mongosh code."""

    statement: str = ""
    code: str = ""
    note: str = ""


@dataclass(frozen=True)
class QueryResultDto:
    """The documents returned by a run, ready for the table and JSON views."""

    documents: list[dict]
    columns: list[str]
    numeric: list[bool]
    rows: list[list[str]]
    json: str
    elapsed_ms: float
    error: str = ""
    stages: int = 0

    @property
    def count(self) -> int:
        return len(self.documents)
