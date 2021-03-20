from django.contrib.auth.models import AbstractUser
from django.db import models

states = [('AL','AL'),('AK','AK'),('AZ','AZ'),('AR','AR'),('CA','CA'),('CO','CO'),('CT','CT'),('DC','DC'),('DE','DE'),('FL','FL'),('GA','GA'),('HI','HI'),('ID','ID'),('IL','IL'),('IN','IN'),('IA','IA'),('KS','KS'),('KY','KY'),('LA','LA'),('ME','ME'),('MD','MD'),('MA','MA'),('MI','MI'),('MN','MN'),('MS','MS'),('MO','MO'),('MT','MT'),('NE','NE'),('NV','NV'),('NH','NH'),('NJ','NJ'),('NM','NM'),('NY','NY'),('NC','NC'),('ND','ND'),('OH','OH'),('OK','OK'),('OR','OR'),('PA','PA'),('RI','RI'),('SC','SC'),('SD','SD'),('TN','TN'),('TX','TX'),('UT','UT'),('VT','VT'),('VA','VA'),('WA','WA'),('WV','WV'),('WI','WI'),('WY','WY')]

class CustomUser(AbstractUser):
    fullname = models.CharField(blank=True, max_length=50)
    address = models.CharField(blank=True, max_length=100)
    address_2 = models.CharField(blank=True, max_length=100)
    city = models.CharField(blank=True, max_length=100)
    state = models.CharField(blank=True, choices=states, max_length=2)
    zipcode = models.CharField(null=True, max_length=9, blank=True) # validate max_length in frontend - model rejects

class FuelQuote(models.Model):
    amountGallons = models.IntegerField(blank = True, null = False)
    pricePerGallons = models.IntegerField(blank = True, null = False)
    dateOfQuote = models.DateField(blank=True, null=False)
    address = models.CharField(blank=True, max_length=100, null=False)