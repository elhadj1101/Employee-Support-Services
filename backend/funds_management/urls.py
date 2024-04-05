from django.urls import path
from .views import CreateExpenceIncome,ModifyExpenceIncome,ListExpensesAndIncome, DeleteExpensesAndIncome



urlpatterns = [
    path("add/",CreateExpenceIncome.as_view()),
    path('modify/<pk>',ModifyExpenceIncome.as_view()),
     path('list/', ListExpensesAndIncome.as_view(), name='list_expenses_and_income'),
    path('delete/<pk>/', DeleteExpensesAndIncome.as_view(), name='delete_expenses_and_income'),
]