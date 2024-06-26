from django.urls import path
from .views import RecordView,SingleRecordView, CommityView, SingleCommityView, GeneralAnalitics



urlpatterns = [
    path("",RecordView.as_view()),
    path('analitics/', GeneralAnalitics.as_view()),
    path("commity/",CommityView.as_view()),
    path('commity/<pk>/', SingleCommityView.as_view()),
    path('<pk>/', SingleRecordView.as_view()),
]
