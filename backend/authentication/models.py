from django.db import models
from django.contrib.auth.models import AbstractUser


# Create your models here.

'''
for the Admin and the User model I have changed the related_name in both groups and user_permissions , because there was a conflict with 
related_name (related_name must be unique in ManyToMany relations) 
I believe the problem because we created two different users class that inherits from AbstractUser
note : this is the only solution that I found , feel free to change if you have better solution
'''




class Admin(AbstractUser):
    username = models.CharField(max_length = 255)
    password = models.CharField(max_length = 255)
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='admin_groups' 
    )
    
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name= 'admins',
    )
    
class Request(models.Model):
    pass

class Employee(AbstractUser):
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='user_groups' 
    )
    
    user_permissions = models.ManyToManyField(
        
        'auth.Permission',
        related_name= 'users',
    )
    
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

    
    email = models.EmailField(max_length = 255 , unique = True)
    password = models.CharField(max_length = 255)
    first_name = models.CharField(max_length = 255)
    last_name = models.CharField(max_length = 255)
    birth_day = models.DateField()
    salary = models.CharField(max_length = 255 )
    marital_situation = models.CharField(max_length = 100 , choices = marital_situation_options)
    sexe = models.CharField(max_length = 100 ,  choices = sexe_options)
    rip = models.CharField(max_length = 255)
    bank_name = models.CharField(max_length = 255)
    bank_num = models.CharField(max_length = 255)
    id_number = models.CharField(max_length = 255)
    requests = models.ForeignKey(Request , on_delete = models.PROTECT , null = True )
    role = models.CharField(max_length = 100 , choices = role_options )
    phone_number = models.CharField(max_length = 255)
    is_created = models.BooleanField(default = False)
    
    USERNAME_FIELD = 'email'
    username = None
    
    def __str__(self) -> str:
        return self.first_name + ' ' + self.last_name
    
    
   
    

    
 