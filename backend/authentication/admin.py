from django.contrib import admin
from .models import Employee, Request
from django.contrib.auth.admin import UserAdmin
from django.forms import  Textarea
from django.db import models


class UserAdminConfig(UserAdmin):
    model = Employee
    search_fields = ('email','first_name',)
    
    list_filter = ('email',  'first_name', 'role', 'is_active', 'is_superuser',)
    ordering = ('-created_at',)
    list_display = ('email',  'first_name', 'role' ,
                    'is_active','is_superuser', )
    fieldsets = (
        ("Auth", {'fields': ('email',)}),
        ("Personal", {'fields':( 'id_number','first_name','last_name','phone_number',
                        'birth_date', 'sexe', 'martial_situation',)}),
        ("Money", {'fields':('salary','rip', 'bank_rib')}),
        ('Permissions', {'fields': ('role','is_staff', 'is_active', 'is_superuser')}),
        # ('Requests', {'fields': ('requests',)}),
    )
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 20, 'cols': 60})},
    }
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'id_number',
                       'is_active', 'is_staff','first_name','last_name','phone_number',
                        'birth_date', 'sexe', 'martial_situation','salary','rip',  'bank_rib',
                        'role',)}
         ),
    )


admin.site.register(Employee, UserAdminConfig)
admin.site.register(Request)