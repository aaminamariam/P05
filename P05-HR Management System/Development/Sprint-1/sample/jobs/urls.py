from rest_framework.routers import SimpleRouter
from django.urls import path
from .api import JobViewSet

router = SimpleRouter()
router.register('jobpostings',JobViewSet)
urlpatterns = router.urls
# urlpatterns = [
#     path('jobs/', JobCreate.as_view()),
# ]
