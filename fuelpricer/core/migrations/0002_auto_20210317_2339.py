# Generated by Django 3.1.7 on 2021-03-18 04:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='zipcode',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
