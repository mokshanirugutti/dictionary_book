# Generated by Django 4.2.13 on 2024-07-04 08:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('dictionary_app', '0004_profile'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='otp_purpose',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]