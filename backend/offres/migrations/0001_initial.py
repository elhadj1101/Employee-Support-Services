# Generated by Django 5.0.3 on 2024-03-18 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Offre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('published_at', models.DateField(auto_now_add=True)),
                ('title', models.CharField(max_length=35)),
                ('slug', models.SlugField()),
                ('description', models.TextField()),
                ('max_participants', models.IntegerField()),
                ('start_date', models.DateField()),
                ('end_date', models.DateField()),
                ('cover', models.ImageField(upload_to='%Y/%m/%d')),
            ],
        ),
    ]