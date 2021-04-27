from django.test import TestCase, Client
from django.urls import reverse
from core.models import CustomUser, FuelQuote
import json

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.createUser = reverse('create_user')
        self.CustomUser = CustomUser.objects.create(
            fullname='Imatestcase',
            address='843 odea blvd',
            address_2='844 odea blvd',
            city='Houston',
            state='TX',
            zipcode='77777'
        )
    
    def test_CustomUsercreate_POST_add_new_user(self):
        CustomUser.objects.create(
            username='djangotestcase',
            password='djangotestcase',
            fullname='Imatestcase',
            address='843 odea blvd',
            address_2='844 odea blvd',
            city='Houston',
            state='TX',
            zipcode='77777'
        )

        response = self.client.post(self.createUser, {
            'username':'djangotestcase2',
            'password':'djangotestcase2',
            'fullname':'Imatestcase',
            'address':'843 odea blvd',
            'address_2':'844 odea blvd',
            'city':'Houston',
            'state':'TX',
            'zipcode':'77777'
        })
        #self.assertEquals(response.status_code, 400)
        self.assertEquals(response.status_code, 201)


    def hello_world_test_view(self):
        response = self.client.get(reverse('hello_world'))
        self.assertEquals(response.status_code, 200)