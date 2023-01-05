from rest_framework import viewsets
from django.contrib.auth.models import User
from users.api import serializers


class UsersViewSet(viewsets.ModelViewSet):

    queryset = User.objects.all()
    serializer_class = serializers.UsersSerializer
