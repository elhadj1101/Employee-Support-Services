# Generated by Django 5.0.3 on 2024-04-29 22:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('funds_management', '0006_commity'),
    ]

    operations = [
        migrations.AddField(
            model_name='commity',
            name='current_year',
            field=models.IntegerField(default=2024),
        ),
    ]
