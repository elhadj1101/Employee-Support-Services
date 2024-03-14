from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager



options_familliale = [
        ('marie', 'marie'),  
        ('divorce', 'divorce'),  
        ('celibataire', 'celibataire'),  
        ('veuf', 'veuve'),
]

options_sexe = [
        ('homme' ,'homme'),
        ('femme' , 'femme'),
    ]

options_role = [
        ('president', 'President du Comite'),
        ('vice_president', 'Vice-President du Comite'),
        ('tresorier', 'Tresorier du Comite'),
        ('membre', 'Membre du Comite'),
        ('employe', 'Employe'),
    ]


class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault('is_admin', True)
        other_fields.setdefault('is_created', True)
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_active', True)
        other_fields.setdefault('is_superuser', True)
        
        if other_fields.get('is_admin') is not True:
            raise ValueError(
                'Superuser must be assigned to is_admin=True.')
        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')

        if other_fields.get('is_created') is not True:
            raise ValueError(
                'Superuser must be assigned to is_created=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email, **other_fields)
        user.set_password(password)
        user.save()
        return user





class Request(models.Model):
    pass

class Employee(AbstractBaseUser, PermissionsMixin):

    objects = CustomAccountManager()
    

    # this is replaced with is_superuser
    #is_admin = models.BooleanField(default = False)
    email = models.EmailField(max_length = 255 , unique = True)
    password = models.CharField(max_length = 255)
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    birth_date = models.DateField()
    birth_adress = models.CharField(max_length = 255)
    salary = models.CharField(max_length = 255 )
    martial_situation = models.CharField(max_length = 100 , choices = options_familliale)
    sexe = models.CharField(max_length = 100 ,  choices = options_sexe)
    rip = models.CharField(max_length = 255)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add = True)
    bank_rib = models.CharField(max_length = 255)
    id_number = models.CharField(max_length = 255)
    requests = models.ForeignKey(Request , on_delete = models.PROTECT , null = True )
    role = models.CharField(max_length = 100 , choices = options_role )
    phone_number = models.CharField(max_length = 255)
    #is_created = models.BooleanField(default = False)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['is_admin', 'is_created', 'birth_day']
    
    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
    
    
   
    

    
 