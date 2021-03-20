from django.test import SimpleTestCase
from django.urls import reverse, resolve
from frontend.views import index_view

class TestUrls(SimpleTestCase):
    def test_hello__url_is_resolved(self):
        url = reverse('hello')
        print(resolve(url))
        self.assertEquals(resolve(url).func, index_view)
