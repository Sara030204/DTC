# Generated by Django 5.0.3 on 2024-03-31 04:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0016_alter_customer_mobile'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitems',
            name='price',
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
        ),
        migrations.AddField(
            model_name='orderitems',
            name='qty',
            field=models.IntegerField(default=1),
        ),
    ]
