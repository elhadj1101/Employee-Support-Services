# Generated by Django 5.0.3 on 2024-03-27 16:00

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0014_alter_document_document_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='document',
            name='loan',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='requests.loan'),
        ),
        migrations.AlterField(
            model_name='document',
            name='financial_aid',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='documents', to='requests.financial_aid'),
        ),
    ]
