# Generated by Django 5.0.3 on 2024-03-18 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('offres', '0002_alter_offre_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='offre',
            name='slug',
            field=models.SlugField(),
        ),
    ]
