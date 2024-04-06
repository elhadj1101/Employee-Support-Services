from django.urls import path
from .views import CreateRecord,ModifyRecord,ListRecord, DeleteRecord



urlpatterns = [
    path("add/",CreateRecord.as_view()),
    path('modify/<pk>',ModifyRecord.as_view()),
     path('list/', ListRecord.as_view(), name='list_expenses_and_income'),
    path('delete/<pk>/', DeleteRecord.as_view(), name='delete_expenses_and_income'),
]