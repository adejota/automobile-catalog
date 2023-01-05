from rest_framework import serializers
from cars import models


class CarsSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Cars
        fields = '__all__'
