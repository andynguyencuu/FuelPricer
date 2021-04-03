from django.test import TestCase, Client
from django.urls import reverse
import json

def setUp(self):
    self.client = Client()
    self.create_user = reverse('create_user')

