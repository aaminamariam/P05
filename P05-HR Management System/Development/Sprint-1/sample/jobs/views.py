from django.shortcuts import render

from .models import Job
from .serializers import JobSerializer
from rest_framework import generics, viewsets

class JobCreate(generics.ListCreateAPIView,viewsets.GenericViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
# Create your views here.
http_method_names = ['get', 'post', 'patch', 'delete']
