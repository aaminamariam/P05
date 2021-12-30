from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):
    job_title = models.CharField(max_length=100, unique=True)
    jd = models.CharField(max_length=1000)
    dept_name = models.CharField(max_length=500, blank=True)
    location = models.CharField(max_length=500, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
