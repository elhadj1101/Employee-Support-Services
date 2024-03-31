from django.db import models

type_choices = [
    ('expence','expence'),
    ('income','income'),
]
# Create your models here.
class ExpenceIncome(models.Model):
    type = models.CharField(max_length=50,choices=type_choices)
    amount = models.DecimalField(max_digits=20,decimal_places=2)
    tag = models.CharField(max_length=50)
    motif = models.TextField()
    def __str__(self) -> str:
        return self.type
