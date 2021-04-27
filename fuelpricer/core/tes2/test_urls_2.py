from django.test import SimpleTestCase
from django.urls import reverse, resolve
from core.views import CustomUserCreate, ObtainTokenPairWithFullnameView, CustomUserUpdate, HelloWorldView, FuelQuoteView, LogoutAndBlacklistRefreshTokenForUserView
from rest_framework_simplejwt import views as jwt_views

class TestUrls(SimpleTestCase):
    def test_create_user_url_is_resolved(self):
        url = reverse('create_user')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, CustomUserCreate)

    def test_update_user_url_is_resolved(self):
        url = reverse('update_user')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, CustomUserUpdate)

    def test_token_create_url_is_resolved(self):
        url = reverse('token_create')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, ObtainTokenPairWithFullnameView)    

    def test_token_refresh_url_is_resolved(self):
        url = reverse('token_refresh')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, jwt_views.TokenRefreshView)
        
    def test_hello_world_url_is_resolved(self):
        url = reverse('hello_world')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, HelloWorldView)

    def test_quote_url_is_resolved(self):
        url = reverse('quote')
        #print(resolve(url))
        self.assertEquals(resolve(url).func.view_class, FuelQuoteView)

    #def test_blacklist_url_is_resolved(self):
        #url = reverse('blacklist')
        #print(resolve(url))
        #self.assertEquals(resolve(url).func.view_class, LogoutAndBlacklistRefreshTokenForUserView)