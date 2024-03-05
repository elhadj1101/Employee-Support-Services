from rest_framework import generics
from .models import Employee
from .serializers import EmployeeSerializer

# this is just for testing our add user enpoint 

class CreateUserView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
