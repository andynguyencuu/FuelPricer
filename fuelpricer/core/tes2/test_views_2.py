from django.test import TestCase, Client
from django.urls import reverse
from core.models import CustomUser, FuelQuote
from django.contrib.auth.models import User
import json

class TestViews(TestCase):

    def setUp(self):
        self.client = Client()
        self.createUser = reverse('create_user')
        self.fuelQuote = reverse('quote')
        # self.fuelQuoteUser = CustomUser.objects.create(
        #     username='djangotestcase4',
        #     password='djangotestcase4',
        #     fullname='Imatestcase4',
        #     address='843 odea blvd',
        #     address_2='844 odea blvd',
        #     city='Houston',
        #     state='TX',
        #     zipcode='77777'
        # )
    
    def test_CustomUsercreate_POST_add_new_user(self):
        CustomUser.objects.create_user(
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
        self.assertEquals(response.status_code, 201)

    def test_CustomUsercreate_POST_no_new_user(self):
        response = self.client.post(self.createUser, {
            'password':'djangotestcase3',
            'fullname':'Imatestcasedude',
            'address':'843 odea blvd',
            'address_2':'844 odea blvd',
            'city':'Houston',
            'state':'TX',
            'zipcode':'77777'
        })
        self.assertEquals(response.status_code, 400)

    def test_FuelQuote_POST_add_new_quote(self):
        fuelQuoteUser = CustomUser.objects.create_user(
            username='djangotestcase4',
            password='djangotestcase4',
            fullname='Imatestcase4',
            address='843 odea blvd',
            address_2='844 odea blvd',
            city='Houston',
            state='TX',
            zipcode='77777'
        )

        FuelQuote.objects.create(
            REQUESTOR=fuelQuoteUser,
            gallonsRequested=10000,
            dateOfQuote='2021-04-27',
            dateRequested="2021-04-27T08:51:44.932Z",
            address='843 odea blvd',
            address_2='844 odea blvd',
            pricePerGallon=1.50,
            quotePrice=15000.00
        )

        response = self.client.post(self.fuelQuote, {
            'REQUESTOR':fuelQuoteUser,
            'gallonsRequested':10000,
            'dateOfQuote':'2021-04-27',
            'dateRequested':"2021-04-27T08:51:44.932Z",
            'address':'843 odea blvd',
            'address_2':'843 odea blvd',
            'pricePerGallon':1.50,
            'quotePrice':15000.00
        })
        self.assertEquals(response.status_code, 400)


    def hello_world_test_view(self):
        response = self.client.get(reverse('hello_world'))
        self.assertEquals(response.status_code, 200)