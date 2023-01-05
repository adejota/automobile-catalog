from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from cars import models
from cars.api import serializers


class CarsViewSet(viewsets.ModelViewSet):

    permission_classes = [IsAuthenticatedOrReadOnly]

    queryset = models.Cars.objects.all()
    serializer_class = serializers.CarsSerializer
