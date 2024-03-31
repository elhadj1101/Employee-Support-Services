from django.urls import path
from .views import CreateExpenceIncome,ModifyExpenceIncome



urlpatterns = [
    path("add/",CreateExpenceIncome.as_view()),
    path('modify/<pk>',ModifyExpenceIncome.as_view()),
]