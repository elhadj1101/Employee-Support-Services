# Generated by Django 5.0.3 on 2024-03-14 13:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0007_alter_employee_martial_situation_alter_employee_role_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='sexe',
            field=models.CharField(choices=[('homme', 'homme'), ('femme', 'femme')], max_length=100),
        ),
    ]
