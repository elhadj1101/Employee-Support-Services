from django.contrib import admin
from .models import Loan , Financial_aid , Document
# Register your models here.
admin.site.register(Loan)
admin.site.register(Financial_aid)
admin.site.register(Document)