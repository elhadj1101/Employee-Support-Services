# Generated by Django 5.0.3 on 2024-04-06 23:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('funds_management', '0003_remove_expenceincome_tag_expenceincome_financial_aid_and_more'),
        ('requests', '0022_rename_start_loan_date_loan_request_response_at_and_more'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='ExpenceIncome',
            new_name='Record',
        ),
    ]
