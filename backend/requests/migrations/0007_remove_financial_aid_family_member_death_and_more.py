# Generated by Django 5.0.3 on 2024-03-20 06:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('requests', '0006_alter_financial_aid_request_response_at'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='financial_aid',
            name='family_member_death',
        ),
        migrations.AddField(
            model_name='financial_aid',
            name='family_member',
            field=models.CharField(choices=[('wife', 'spouse'), ('son', 'fils'), ('parent', 'parent'), ('brother', 'frère')], max_length=50, null=True),
        ),
    ]
