from rest_framework import serializers
from .models import Employee, options_role
from .utils import is_digits

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'id','email','password','first_name','last_name',
            'birth_date','birth_adress','salary','martial_situation',
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
        if data.get('role', None) == options_role[0][0]:
            presidents = Employee.objects.filter(role = options_role[0][0])
            if presidents.exists():
                raise serializers.ValidationError({"role":"There can only be one president"})
        elif data.get('role', None) == options_role[1][0]:
            vice_presidents = Employee.objects.filter(role = options_role[1][0])
            if vice_presidents.exists():
                raise serializers.ValidationError({"role":"There can only be one vice president"})
        elif data.get('role', None) == options_role[2][0]:
            tresorier = Employee.objects.filter(role = options_role[2][0])
            if tresorier.exists():
                raise serializers.ValidationError({"role":"There can only be one tresorier"})
        if not(is_digits(data.get('phone_number',None))):
                raise serializers.ValidationError({"phone_number":"Phone number must contain digits"})
        if len(data['phone_number']) != 10:
                raise serializers.ValidationError({"phone_number":"Phone number must be 10 digits"})
        if not(is_digits(data.get('rip',None))):
                raise serializers.ValidationError({"rip":"RIP must contain only digits"})
        if len(data.get('rip',None)) != 20:
                raise serializers.ValidationError({"rip":"RIP must be 20 digits"})
        if not(is_digits(data.get('bank_rib',None))):
                raise serializers.ValidationError({"bank_rib":"RIB must contain only digits"})
        if len(data.get('bank_rib',None)) != 20:
                raise serializers.ValidationError({"bank_rib":"RIB must be 20 digits"})
        if not(is_digits(data.get('id_number',None))):
                raise serializers.ValidationError({"id_number":"Id number must contain only digits"})
        if len(data.get('id_number',None)) != 18:
                raise serializers.ValidationError({"id_number":"Id number must be 18 digits"})
        if not(is_digits(data.get('salary',None))):
                raise serializers.ValidationError({"salary":"Salary must contain only digits"})
        return data
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)

        instance = self.Meta.model(**validated_data)            
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance     

class EmployeeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'id','email','first_name','last_name',
            'birth_date','birth_adress','salary','martial_situation',
            'sexe','rip','bank_rib','id_number',
            'role','phone_number','is_active'
        ]
    def validate(self, attrs):
        data = super().validate(attrs)
        # makes sure only one president is created
        if data.get('role', None) == options_role[0][0]:
            presidents = Employee.objects.filter(role = options_role[0][0])
            if presidents.exists() and presidents.first().pk != self.instance.pk:
                raise serializers.ValidationError({"role":"There can only be one president"})
        elif data.get('role', None) == options_role[1][0]:
            vice_presidents = Employee.objects.filter(role = options_role[1][0])
            if vice_presidents.exists() and vice_presidents.first().id != self.instance.pk:
                raise serializers.ValidationError({"role":"There can only be one vice president"})
        elif data.get('role', None) == options_role[2][0]:
            tresorier = Employee.objects.filter(role = options_role[2][0])
            if tresorier.exists() and tresorier.first().pk != self.instance.pk:
                raise serializers.ValidationError({"role":"There can only be one tresorier"})
        if not(is_digits(data.get('phone_number',None))):
                raise serializers.ValidationError({"phone_number":"Phone number must contain digits"})
        if len(data['phone_number']) != 10:
                raise serializers.ValidationError({"phone_number":"Phone number must be 10 digits"})
        if not(is_digits(data.get('rip',None))):
                raise serializers.ValidationError({"rip":"RIP must contain only digits"})
        if len(data.get('rip',None)) != 20:
                raise serializers.ValidationError({"rip":"RIP must be 20 digits"})
        if not(is_digits(data.get('bank_rib',None))):
                raise serializers.ValidationError({"bank_rib":"RIB must contain only digits"})
        if len(data.get('bank_rib',None)) != 20:
                raise serializers.ValidationError({"bank_rib":"RIB must be 20 digits"})
        if not(is_digits(data.get('id_number',None))):
                raise serializers.ValidationError({"id_number":"Id number must contain only digits"})
        if len(data.get('id_number',None)) != 18:
                raise serializers.ValidationError({"id_number":"Id number must be 18 digits"})
        if not(is_digits(data.get('salary',None))):
                raise serializers.ValidationError({"salary":"Salary must contain only digits"})
        return data


class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField(required = True)
    password = serializers.CharField(required = True)
    password2 = serializers.CharField(required = True)
    

