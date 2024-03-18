
from django.urls import path 
from .views import OffreView, OffreDetailView

urlpatterns = [
    path('',OffreView.as_view()),
    path('<slug:slug>/', OffreDetailView.as_view(), name='offre_detail'),
]
