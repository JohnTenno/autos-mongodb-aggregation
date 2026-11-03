"""Smoke test: every page renders and the 25 queries run against MongoDB.

Needs mongod running with the data loaded (python -m scripts.migrate).
Usage:  .venv/bin/python -m unittest discover tests
"""
import unittest

from app import create_app
from app.modules.queries.catalog import QUERIES


class AppTest(unittest.TestCase):
    def setUp(self):
        self.client = create_app().test_client()

    def test_dashboard(self):
        page = self.client.get("/")
        self.assertEqual(page.status_code, 200)
        self.assertIn("138", page.get_data(as_text=True))

    def test_every_query_runs(self):
        for query in QUERIES:
            for view in ("tabla", "json"):
                with self.subTest(query=query.number, view=view):
                    page = self.client.get(f"/consultas/{query.number}?ejecutar=1&ver={view}")
                    html = page.get_data(as_text=True)
                    self.assertEqual(page.status_code, 200)
                    self.assertNotIn("no se pudo ejecutar", html)
                    self.assertNotIn("Sin documentos", html)

    def test_unknown_query(self):
        self.assertEqual(self.client.get("/consultas/26").status_code, 400)


if __name__ == "__main__":
    unittest.main()
