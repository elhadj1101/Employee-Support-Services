from rest_framework import serializers
from .models import Employee

# this serializer was created just for testing the add user endpoint with mysql database 

class EmployeeSerializer(serializers.ModelSerializer):
        class Meta:
            model = Employee
            fields = [
                'email',
                'password',
                'first_name',
                'last_name',
                'birth_day',
                'salary',
                'marital_situation',
                'sexe',
                'rip',
                'bank_name',
                'bank_num',
                'id_number',
                'role',
                'phone_number',
                'is_created',
                'is_admin'
            ]

            
