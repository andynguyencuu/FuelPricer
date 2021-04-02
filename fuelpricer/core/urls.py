from django.urls import path
from rest_framework_simplejwt import views as jwt_views
from .views import *

urlpatterns = [
    path('user/create/', CustomUserCreate.as_view(), name="create_user"),
    path('user/update/', CustomUserUpdate.as_view(), name="update_user"),
    path('token/obtain/', ObtainTokenPairWithFullnameView.as_view(), name='token_create'),  # override sjwt stock token
    path('token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('quote/', FuelQuoteView.as_view(), name='quote'),
]
