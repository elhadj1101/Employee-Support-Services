# Generated by Django 5.0.3 on 2024-03-27 13:34

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0015_alter_loan_loan_amount'),
    ]

    operations = [
        migrations.AlterField(
            model_name='loan',
            name='start_loan_date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
