from django.test import SimpleTestCase
from core.pricing import Pricer
price = Pricer(2, 3, "TX", 1)
price2 = Pricer(2, 3, "MS", 1)

class TestGenerate(SimpleTestCase):
    def test_generate_instate(self):
        self.assertEqual(6.48, price.generate())