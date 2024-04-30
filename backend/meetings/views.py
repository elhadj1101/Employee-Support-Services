from rest_framework import generics
from rest_framework.response import Response
from .models import Meeting
from .serializers import MeetingSerializer
from .permissions import IsCommitte, CanCreateMeeting
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

# Create your views here.


class MeetingsView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsCommitte, CanCreateMeeting]
    queryset = Meeting.objects.all()
    serializer_class = MeetingSerializer


class SingleMeetingView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, CanCreateMeeting]
    serializer_class = MeetingSerializer

    def get_queryset(self):
        return Meeting.objects.filter(pk=self.kwargs["pk"])
