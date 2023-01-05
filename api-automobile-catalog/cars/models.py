from django.db import models
from uuid import uuid4

# Create your models here.


def upload_image_book(instance, filename):
    return f"{instance.id}-{filename}"


class Cars(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid4, editable=False)
    name = models.CharField(max_length=255)
    brand = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    year = models.IntegerField()
    kilometers = models.IntegerField()
    price = models.DecimalField(max_digits=9, decimal_places=2)
    image = models.ImageField(
        upload_to=upload_image_book, blank=True, null=True)
    created_at = models.DateField(auto_now_add=True)

    def __str__(self):
        return self.name
