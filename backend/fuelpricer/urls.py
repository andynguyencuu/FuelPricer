from django.urls import path
from . import views


app_name = 'fuelpricer'  # here for namespacing of urls.

urlpatterns = [
    path("", views.dashboard, name="dashboard"),
]