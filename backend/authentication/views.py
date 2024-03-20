from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from .models import Employee
from .serializers import EmployeeSerializer, SignupSerializer, EmployeeDetailsSerializer
from .permissions import IsAdmin

# this is just for testing our add user enpoint 
class CreateUserView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserDetailsView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeDetailsSerializer
    permission_classes = [IsAuthenticated, IsAdmin]


class UserDataView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        serializer = EmployeeDetailsSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class SignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, format='json'):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # check if user exists:
            email = serializer.validated_data.get('email')
            user = Employee.objects.filter(email = email)
            if not(user.exists()):
                return Response([{"email":"User does not exist"}], status=status.HTTP_400_BAD_REQUEST)
            # save the new password
            password = serializer.validated_data.get('password')
            password2 = serializer.validated_data.get('password2')
            if password != password2:
                return Response([{"password":"Passwords do not match"}], status=status.HTTP_400_BAD_REQUEST)
            user = user.first()
            if user.is_active:
                return Response([{"email":"User is already active"}], status=status.HTTP_400_BAD_REQUEST)
            user.set_password(password)
            user.is_active = True
            user.save()
            return Response([{"success":"User Signed up successfuly"}], status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    


# {
#     "email":"testteat@test.com",
#     "password":"testtest",
#     "password2":"testtest"
# }