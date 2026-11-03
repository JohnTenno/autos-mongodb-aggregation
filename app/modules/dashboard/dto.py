"""Shapes travelling out of the dashboard module."""
from dataclasses import dataclass


@dataclass(frozen=True)
class CollectionStatsDto:
    """One row of the summary table."""

    name: str
    source: str
    design: str
    documents: int
    indexes: int
    size_kb: float
