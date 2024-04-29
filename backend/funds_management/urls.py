from django.urls import path
from .views import RecordView,SingleRecordView, CommityView, SingleCommityView



urlpatterns = [
    path("",RecordView.as_view()),
    path("commity/",CommityView.as_view()),
    path('commity/<pk>/', SingleCommityView.as_view()),
    path('<pk>/', SingleRecordView.as_view()),
]