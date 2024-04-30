from django.db import models
from datetime import date

from requests.serializers import Loan, Financial_aid
type_choices = [
    ('expense','expense'),
    ('income','income'),
]
# Create your models here.
class Record(models.Model):
    type = models.CharField(max_length=50,choices=type_choices)
    created_at = models.DateField(auto_now=True)
    amount = models.DecimalField(max_digits=20,decimal_places=2)
    loan = models.ForeignKey(Loan , on_delete = models.CASCADE , null =True,  related_name='records', blank=True,)
    financial_aid = models.ForeignKey(Financial_aid , on_delete = models.CASCADE, related_name='records' , null = True, blank=True,)
    motif = models.TextField(blank=True, null=True)
    def __str__(self) -> str:
        return self.type + " (" + str(self.pk) + ")" 


class Commity(models.Model):
    name = models.CharField(max_length=50)
    current_balance = models.DecimalField(max_digits=1000, default=0,decimal_places=2)
    current_year_expenses = models.DecimalField(max_digits=1000, default=0,decimal_places=2)
    current_year_income = models.DecimalField(max_digits=1000, default=0,decimal_places=2)
    current_year = models.IntegerField(default=date.today().year)
    def __str__(self) -> str:
        return self.name 