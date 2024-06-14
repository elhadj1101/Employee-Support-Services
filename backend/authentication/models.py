from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)

# imports to send email
from django.db.models.signals import post_save, pre_save
from django.dispatch import receiver
from django.core.mail import send_mail
# from backend.settings import EMAIL_HOST_USER


options_familliale = [
    ("marie", "marie"),
    ("divorce", "divorce"),
    ("celibataire", "celibataire"),
    ("veuf", "veuve"),
]

options_sexe = [
    ("homme", "homme"),
    ("femme", "femme"),
]

options_role = [
    ("president", "President du Comite"),
    ("vice_president", "Vice-President du Comite"),
    ("tresorier", "Tresorier du Comite"),
    ("membre", "Membre du Comite"),
    ("employe", "Employe"),
]


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault("is_admin", True)
        other_fields.setdefault("is_created", True)
        other_fields.setdefault("is_staff", True)
        other_fields.setdefault("is_active", True)
        other_fields.setdefault("is_superuser", True)

        if other_fields.get("is_admin") is not True:
            raise ValueError("Superuser must be assigned to is_admin=True.")
        if other_fields.get("is_staff") is not True:
            raise ValueError("Superuser must be assigned to is_staff=True.")

        if other_fields.get("is_created") is not True:
            raise ValueError("Superuser must be assigned to is_created=True.")

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):

        if not email:
            raise ValueError(_("You must provide an email address"))

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user


class Employee(AbstractBaseUser, PermissionsMixin):

    objects = CustomAccountManager()

    # this is replaced with is_superuser
    # is_admin = models.BooleanField(default = False)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    birth_date = models.DateField()
    birth_adress = models.CharField(max_length=255)
    salary = models.CharField(max_length=255)
    martial_situation = models.CharField(max_length=100, choices=options_familliale)
    sexe = models.CharField(max_length=100, choices=options_sexe)
    rip = models.CharField(max_length=255)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    retired = models.BooleanField(default=False)
    retired_at = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    recruted_at = models.DateField()
    bank_rib = models.CharField(max_length=255)
    id_number = models.CharField(max_length=255)
    role = models.CharField(max_length=100, choices=options_role)
    phone_number = models.CharField(max_length=255)
    # is_created = models.BooleanField(default = False)
    username = None
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["is_admin", "is_created", "birth_day"]

    def __str__(self) -> str:
        # self.cached_plain_pass
        return self.first_name + " " + self.last_name



#uncomment this to add the  send email functionnality 
#uncomment the import EMAIL_HOST_USER
# important : you need to configure your email in backend/settings.py


# sending email to new employees containing their credentials


# @receiver(post_save, sender=Employee)
# def email_post_save(sender, instance, created, **kwargs):
#     if created:

#         subject = "Votre Compte a été créé! Bienvenu sur les OeuvreSociale ESI-SBA"
#         message = f"""
# Cher/Chère {instance.first_name} {instance.last_name},

# Nous avons le plaisir de vous informer que votre compte a été créé avec succès sur le site example.com.
# Vous pouvez maintenant vous connecter en utilisant les identifiants suivants : 

# Email : {instance.email}
# Mot de passe : {instance.cached_plain_pass}

# Veuillez suivre le lien ci-dessous pour accéder au site :

# example.com

# Une fois connecté(e), vous aurez accès à toutes les fonctionnalités et ressources disponibles en tant qu'employé(e) de ESI-SBA.

# Si vous avez des questions ou besoin d'aide, n'hésitez pas à nous contacter.

# Cordialement,
# # """

#         try:
#             send_mail(
#                 subject,
#                 message,
#                 EMAIL_HOST_USER,
#                 [
#                     instance.email
#                     # Because we don't have real employee emails , I used this email to check ,
#                     # you can add your email here to check
#                 ],
#                 fail_silently=False,
#             )
#         except:
#             pass
#         instance.cached_plain_pass = ""
