from rest_framework import serializers
from .models import Employee, options_role

# this serializer was created just for testing the add user endpoint with mysql database 

class EmployeeSerializer(serializers.ModelSerializer):

    class Meta:
        model = Employee
        fields = [
            'email','password','first_name','last_name',
            'birth_date','salary','martial_situation',
            'sexe','rip','bank_rib','id_number',
            'role','phone_number','is_active','is_superuser'
        ]
        extra_kwargs = {'password': {'write_only': True}}
    def validate(self, attrs):
        data = super().validate(attrs)
        if data.get('is_superuser', False):
            raise serializers.ValidationError({"is_superuser":"is_superuser field must be False"})
        if data.get('is_active', False):
            raise serializers.ValidationError({"is_active":"is_active field must be False"})
        # makes sure only one president is created
        if data.get('role', False) == options_role[0][0]:
            presidents = Employee.objects.filter(role = options_role[0][0])
            if presidents.exists():
                raise serializers.ValidationError({"role":"There can only be one president"})
        elif data.get('role', False) == options_role[1][0]:
            vice_presidents = Employee.objects.filter(role = options_role[1][0])
            if vice_presidents.exists():
                raise serializers.ValidationError({"role":"There can only be one vice president"})
        elif data.get('role', False) == options_role[2][0]:
            tresorier = Employee.objects.filter(role = options_role[2][0])
            if tresorier.exists():
                raise serializers.ValidationError({"role":"There can only be one tresorier"})
        if data.get('phone_number', False):
            
            if len(data['phone_number']) != 10:
                raise serializers.ValidationError({"phone_number":"phone number must be 10 digits"})
        return data
    def create(self, validated_data):
        password = validated_data.pop('password', None)

        instance = self.Meta.model(**validated_data)            
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance     

