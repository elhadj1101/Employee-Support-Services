# Generated by Django 5.0.3 on 2024-04-29 22:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0024_rename_loan_amount_loan_amount_financial_aid_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='financial_aid',
            name='amount',
            field=models.DecimalField(blank=True, decimal_places=2, default=0, max_digits=50, null=True),
        ),
        migrations.AlterField(
            model_name='loan',
            name='amount',
            field=models.DecimalField(decimal_places=2, max_digits=50),
        ),
    ]