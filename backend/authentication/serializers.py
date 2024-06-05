from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import Employee, options_role
from .utils import is_digits


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["first_name"] = user.first_name
        token["last_name"] = user.last_name
        token["role"] = user.role
        token["is_superuser"] = user.is_superuser
        token["is_active"] = user.is_active
        token["sexe"] = user.sexe
        token["birth_date"] = user.birth_date.strftime("%d-%m-%Y")
        token["birth_adress"] = user.birth_adress
        token["martial_situation"] = user.martial_situation
        token["phone_number"] = user.phone_number
        token["rip"] = user.rip
        token["bank_rib"] = user.bank_rib
        token["id_number"] = user.id_number
        token["salary"] = user.salary
        token["email"] = user.email
        token["retired"] = user.retired
        token["recruted_at"] = user.recruted_at.strftime("%d-%m-%Y")
        token["retired_at"] = (
            user.retired_at.strftime("%d-%m-%Y") if user.retired_at else ""
        )
        return token


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "email",
            "password",
            "first_name",
            "last_name",
            "birth_date",
            "birth_adress",
            "salary",
            "martial_situation",
            "sexe",
            "rip",
            "bank_rib",
            "id_number",
            "role",
            "phone_number",
            "is_active",
            "is_superuser",
            "retired",
            "recruted_at",
            "retired_at",
        ]
        extra_kwargs = {"password": {"write_only": True}}

    def validate(self, attrs):
        data = super().validate(attrs)
        if data.get("is_superuser", False):
            raise serializers.ValidationError(
                {"is_superuser": "Le champ is_superuser doit être Fals"}
            )
        if data.get("is_active", False):
            raise serializers.ValidationError(
                {"is_active": "Le champ is_active doit être False"}
            )
        # makes sure only one president is created
        if data.get("role", None) == options_role[0][0]:
            presidents = Employee.objects.filter(role=options_role[0][0])
            if presidents.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul président"}
                )
        elif data.get("role", None) == options_role[1][0]:
            vice_presidents = Employee.objects.filter(role=options_role[1][0])
            if vice_presidents.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul vice-président"}
                )
        elif data.get("role", None) == options_role[2][0]:
            tresorier = Employee.objects.filter(role=options_role[2][0])
            if tresorier.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul trésorier"}
                )
        if not (is_digits(data.get("phone_number", None))):
            raise serializers.ValidationError(
                {"phone_number": "Le numéro de téléphone doit contenir des chiffres"}
            )
        if len(data["phone_number"]) != 10:
            raise serializers.ValidationError(
                {"phone_number": "Le numéro de téléphone doit comporter 10 chiffres"}
            )
        if not (is_digits(data.get("rip", None))):
            raise serializers.ValidationError({"rip": "Le RIP doit contenir uniquement des chiffres"})
        if len(data.get("rip", None)) != 20:
            raise serializers.ValidationError({"rip": "Le RIP doit comporter 20 chiffres"})
        if not (is_digits(data.get("bank_rib", None))):
            raise serializers.ValidationError(
                {"bank_rib": "Le RIB doit contenir des chiffres"}
            )
        if len(data.get("bank_rib", None)) != 20:
            raise serializers.ValidationError({"bank_rib": "Le RIB doit comporter 20 chiffres"})
        if not (is_digits(data.get("id_number", None))):
            raise serializers.ValidationError(
                {"id_number": "l'Id nationale doit contenir que des chiffres"}
            )
        if len(data.get("id_number", None)) != 18:
            raise serializers.ValidationError(
                {"id_number": "L'ID nationale doit comporter 20 chiffres"}
            )
        if not (is_digits(data.get("salary", None))):
            raise serializers.ValidationError(
                {"salary": "Le salaire doit contenir que des chiffres"}
            )
        if data.get("retired", False) and data.get("retired_at", None) is None:
            raise serializers.ValidationError(
                {"retired_at": "Le champ Retired_at est obligatoire"}
            )
        else:
            data["retired_at"] = None
        return data

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        instance.cached_plain_pass = password
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance


class EmployeeDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "birth_date",
            "birth_adress",
            "salary",
            "martial_situation",
            "sexe",
            "rip",
            "bank_rib",
            "id_number",
            "role",
            "phone_number",
            "is_active",
            "is_superuser",
            "retired",
            "recruted_at",
            "retired_at",
        ]

    def validate(self, attrs):
        data = super().validate(attrs)
        # makes sure only one president is created
        if data.get("role", None) == options_role[0][0]:
            presidents = Employee.objects.filter(role=options_role[0][0])
            if presidents.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul président"}
                )
        elif data.get("role", None) == options_role[1][0]:
            vice_presidents = Employee.objects.filter(role=options_role[1][0])
            if vice_presidents.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul vice-président"}
                )
        elif data.get("role", None) == options_role[2][0]:
            tresorier = Employee.objects.filter(role=options_role[2][0])
            if tresorier.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul trésorier"}
                )
        if not (is_digits(data.get("phone_number", None))):
            raise serializers.ValidationError(
                {"phone_number": "Le numéro de téléphone doit contenir des chiffres"}
            )
        if len(data["phone_number"]) != 10:
            raise serializers.ValidationError(
                {"phone_number": "Le numéro de téléphone doit comporter 10 chiffres"}
            )
        if not (is_digits(data.get("rip", None))):
            raise serializers.ValidationError({"rip": "Le RIP doit contenir uniquement des chiffres"})
        if len(data.get("rip", None)) != 20:
            raise serializers.ValidationError({"rip": "Le RIP doit comporter 20 chiffres"})
        if not (is_digits(data.get("bank_rib", None))):
            raise serializers.ValidationError(
                {"bank_rib": "Le RIB doit contenir des chiffres"}
            )
        if len(data.get("bank_rib", None)) != 20:
            raise serializers.ValidationError({"bank_rib": "Le RIB doit comporter 20 chiffres"})
        if not (is_digits(data.get("id_number", None))):
            raise serializers.ValidationError(
                {"id_number": "l'Id nationale doit contenir que des chiffres"}
            )
        if len(data.get("id_number", None)) != 18:
            raise serializers.ValidationError(
                {"id_number": "L'ID nationale doit comporter 20 chiffres"}
            )
        if not (is_digits(data.get("salary", None))):
            raise serializers.ValidationError(
                {"salary": "Le salaire doit contenir que des chiffres"}
            )
        if data.get("retired", False) and data.get("retired_at", None) is None:
            raise serializers.ValidationError(
                {"retired_at": "Le champ Retired_at est obligatoire"}
            )
        else:
            data["retired_at"] = None
        return data

class PartiallyUpdateEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            "id",
            "email",
            "first_name",
            "last_name",
            "birth_date",
            "birth_adress",
            "salary",
            "martial_situation",
            "sexe",
            "rip",
            "bank_rib",
            "id_number",
            "role",
            "phone_number",
            "is_active",
            "is_superuser",
            "retired",
            "recruted_at",
            "retired_at",
        ]

    def validate(self, attrs):
        data = super().validate(attrs)
        # makes sure only one president is created
        if data.get("role", None) == options_role[0][0]:
            presidents = Employee.objects.filter(role=options_role[0][0])
            if presidents.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul président"}
                )
        elif data.get("role", None) == options_role[1][0]:
            vice_presidents = Employee.objects.filter(role=options_role[1][0])
            if vice_presidents.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul vice-président"}
                )
        elif data.get("role", None) == options_role[2][0]:
            tresorier = Employee.objects.filter(role=options_role[2][0])
            if tresorier.exists():
                raise serializers.ValidationError(
                    {"role": "Il ne peut y avoir qu'un seul trésorier"}
                )
        if not (is_digits(data.get("phone_number", None))):
            raise serializers.ValidationError(
                {"phone_number": "Le numéro de téléphone doit contenir des chiffres"}
            )
        if len(data["phone_number"]) != 10:
            raise serializers.ValidationError(
                {"phone_number": "Le numéro de téléphone doit comporter 10 chiffres"}
            )
        if not (is_digits(data.get("rip", None))):
            raise serializers.ValidationError({"rip": "Le RIP doit contenir uniquement des chiffres"})
        if len(data.get("rip", None)) != 20:
            raise serializers.ValidationError({"rip": "Le RIP doit comporter 20 chiffres"})
        if not (is_digits(data.get("bank_rib", None))):
            raise serializers.ValidationError(
                {"bank_rib": "Le RIB doit contenir des chiffres"}
            )
        if len(data.get("bank_rib", None)) != 20:
            raise serializers.ValidationError({"bank_rib": "Le RIB doit comporter 20 chiffres"})
        if not (is_digits(data.get("id_number", None))):
            raise serializers.ValidationError(
                {"id_number": "l'Id nationale doit contenir que des chiffres"}
            )
        if len(data.get("id_number", None)) != 18:
            raise serializers.ValidationError(
                {"id_number": "L'ID nationale doit comporter 20 chiffres"}
            )
        if not (is_digits(data.get("salary", None))):
            raise serializers.ValidationError(
                {"salary": "Le salaire doit contenir que des chiffres"}
            )
        if data.get("retired", False) and data.get("retired_at", None) is None:
            raise serializers.ValidationError(
                {"retired_at": "Le champ Retired_at est obligatoire"}
            )
        else:
            data["retired_at"] = None
        return data


class SignupSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(required=True)



class PartialEmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = [
            'id',
            "email",
            "first_name",
            "last_name",
        ]


#     password2 = serializers.CharField(required = True)
