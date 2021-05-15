from rest_framework import viewsets

from .models import (Profile, UserAddress)
from .serializers import (ProfileSerializer, UserAddressSerializer)
from accounts.permissions import IsOwnerOrReadOnly


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]


class UserAddressViewSet(viewsets.ModelViewSet):
    queryset = UserAddress
    serializer_class = UserAddressSerializer
    permission_classes =  [IsOwnerOrReadOnly]