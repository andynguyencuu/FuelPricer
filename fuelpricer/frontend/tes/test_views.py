from django.test import TestCase, Client
from django.urls import reverse
import json

class TestViews(TestCase):
    def setUp(self):
        self.client = Client()
        self.list_url = reverse('hello')

    def test_index_view_GET(self):
        response = self.client.get(self.list_url)
        self.assertEquals(response.status_code, 200)
        self.assertTemplateUsed(response, 'frontend/index.html')