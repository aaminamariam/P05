from jobs.models import Job
from rest_framework import viewsets,permissions
from .serializers import JobSerializer

class JobViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny,
    ]
    
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    # def perform_create(self, serializer):
    #     serializer.save(owner=self.request.user)
