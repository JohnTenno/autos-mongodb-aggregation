import re
import unittest

from app import create_app


class AppTest(unittest.TestCase):
    def setUp(self):
        self.client = create_app().test_client()

    def test_dashboard(self):
        page = self.client.get("/")
        self.assertEqual(page.status_code, 200)
        self.assertIn("138", page.get_data(as_text=True))

    def test_all_25_queries(self):
        html = self.client.get("/cars/queries/1").get_data(as_text=True)
        links = re.findall(r'href="(/\w+/queries/\d+)"', html)
        self.assertEqual(len(links), 25)
        for link in links:
            with self.subTest(link=link):
                page = self.client.get(link)
                self.assertEqual(page.status_code, 200)
                self.assertNotIn(">0 documentos<", page.get_data(as_text=True))

    def test_unknown_query(self):
        self.assertEqual(self.client.get("/cars/queries/26").status_code, 404)


if __name__ == "__main__":
    unittest.main()
