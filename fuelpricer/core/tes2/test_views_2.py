from django.test import TestCase, Client
from django.urls import reverse
import json

class TestViews(TestCase):
    def hello_world_test_view(self):
        self.client = Client()
        response = client.get(reverse('hello_world'))
        self.assertEquals(response.status_code, 200)