from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('equipos/', views.equipos, name='equipos'),
    path('contacto/', views.contacto, name='contacto'),
]
