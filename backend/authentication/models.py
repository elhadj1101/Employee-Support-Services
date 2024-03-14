from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager


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


# class NewUser(AbstractBaseUser, PermissionsMixin):

#     email = models.EmailField(_('email address'), unique=True)
#     user_name = models.CharField(max_length=150, unique=True)
#     first_name = models.CharField(max_length=150, blank=True)
#     start_date = models.DateTimeField(default=timezone.now)
#     about = models.TextField(_(
#         'about'), max_length=500, blank=True)
#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=False)

#     objects = CustomAccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['user_name', 'first_name']

#     def __str__(self):
#         return self.user_name
# # Create your models here.

'''
for the Admin and the User model I have changed the related_name in both groups and user_permissions , because there was a conflict with 
related_name (related_name must be unique in ManyToMany relations) 
I believe the problem because we created two different users class that inherits from AbstractUser
note : this is the only solution that I found , feel free to change if you have better solution
'''




class Request(models.Model):
    pass

class Employee(AbstractBaseUser, PermissionsMixin):
    # is_admin= False
    # groups = models.ManyToManyField(
    #     'auth.Group',
    #     related_name='user_groups' 
    # )
    
    # user_permissions = models.ManyToManyField(
        
    #     'auth.Permission',
    #     related_name= 'users',
    # )
    
    objects = CustomAccountManager()
    
    marital_situation_options = [
        ('married' , 'married'),  
        ('divorced' , 'divorced'),  
        ('single' , 'single'),  
        ('widow' , 'widow'),
    ]
    sexe_options = [
        ('male' ,'male'),
        ('female' , 'female'),
    ]
    role_options = [
        ('president', 'President of the Committee'),
        ('vice_president', 'Vice President of the Committee'),
        ('treasurer', 'Treasurer of the Committee'),
        ('member', 'Member of the Committee'),
        ('employee', 'Employee'),

    ]

    # this is replaced with is_superuser
    #is_admin = models.BooleanField(default = False)
    email = models.EmailField(max_length = 255 , unique = True)
    password = models.CharField(max_length = 255)
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    birth_date = models.DateField()
    salary = models.CharField(max_length = 255 )
    martial_situation = models.CharField(max_length = 100 , choices = marital_situation_options)
    sexe = models.CharField(max_length = 100 ,  choices = sexe_options)
    rip = models.CharField(max_length = 255)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    bank_name = models.CharField(max_length = 255)
    created_at = models.DateTimeField(auto_now_add = True)
    bank_rib = models.CharField(max_length = 255)
    id_number = models.CharField(max_length = 255)
    requests = models.ForeignKey(Request , on_delete = models.PROTECT , null = True )
    role = models.CharField(max_length = 100 , choices = role_options )
    phone_number = models.CharField(max_length = 255)
    is_created = models.BooleanField(default = False)
    username = None
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['is_admin', 'is_created', 'birth_day']
    
    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
    
    
   
    

    
 