from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
from .models import Employee
from .serializers import (
    EmployeeSerializer,
    SignupSerializer,
    EmployeeDetailsSerializer,
    PartiallyUpdateEmployeeSerializer,
)
from .permissions import IsAdmin, canViewDetails
from django.shortcuts import get_object_or_404
from rest_framework.decorators import permission_classes
from django_filters import rest_framework as filters
from .filters import EmployeeFilter
from rest_framework.filters import OrderingFilter


class CreateUserView(generics.ListCreateAPIView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer
    permission_classes = [IsAuthenticated, IsAdmin]
    filter_backends = (filters.DjangoFilterBackend, OrderingFilter)
    filterset_class = EmployeeFilter
    ordering_fields = ["birth_date", "salary", "recruted_at", "retired_at"]

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
    permission_classes = [IsAuthenticated, canViewDetails]

    def delete(self, request, *args, **kwargs):
        # deactivate the account
        user = self.get_object()
        if not (user.is_active):
            return Response(
                {"error": "L'utilisateur est déjà desactiver"}, status=status.HTTP_400_BAD_REQUEST
            )

        user.is_active = False
        user.save()

        return Response(
            {"success": "L'utilisateur desactiver avec succès"}, status=status.HTTP_200_OK
        )

    def partial_update(self, request, pk, *args, **kwargs):
        if request.user.is_superuser:
            employee = get_object_or_404(Employee, pk=pk)
            serializer = PartiallyUpdateEmployeeSerializer(
                employee, data=request.data, partial=True
            )
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({"employee updated"})
        return Response(
            {"error": "vous n'avez pas les autorisations requises"},
            status=status.HTTP_403_FORBIDDEN,
        )

class ActivateUserView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated, canViewDetails]
    queryset = Employee.objects.all()
    serializer_class = EmployeeDetailsSerializer
    
    def post(self, request, pk):
        user = self.get_object()
        if (user.is_active):
            return Response({"error":"L'utilisateur est deja activer"}, status=status.HTTP_200_OK)
        user.is_active = True
        user.save()
        return Response(
            {"success": "L'utilisateur est activer avec succès"}, status=status.HTTP_200_OK
        )
class UserDataView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = EmployeeDetailsSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class SignupView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, format="json"):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            # check if user exists:
            email = serializer.validated_data.get("email")
            user = Employee.objects.filter(email=email)
            if not (user.exists()):
                return Response(
                    [{"email": "L'utilisateur n'existe pas"}],
                    status=status.HTTP_400_BAD_REQUEST,
                )
            password = serializer.validated_data.get("password")
            # save the new password
            # password2 = serializer.validated_data.get('password2')
            # if password != password2:
            #     return Response([{"password":"Passwords do not match"}], status=status.HTTP_400_BAD_REQUEST)
            user = user.first()
            if user.is_active:
                return Response(
                    [{"email": "L'utilisateur est déjà actif."}],
                    status=status.HTTP_400_BAD_REQUEST,
                )
            # user.set_password(password)
            is_same = check_password(password, user.password)
            if not (is_same):
                return Response(
                    [{"password": "Le mot de passe fourni est erroné."}],
                    status=status.HTTP_400_BAD_REQUEST,
                )
            user.is_active = True
            user.save()
            return Response(
                [{"success": "L'utilisateur a été activé avec succès."}], status=status.HTTP_200_OK
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


