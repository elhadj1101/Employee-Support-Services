from django.urls import path
from .views import MeetingsView, SingleMeetingView


urlpatterns = [
    path("", MeetingsView.as_view()),
    path("<int:pk>/", SingleMeetingView.as_view()),
]
