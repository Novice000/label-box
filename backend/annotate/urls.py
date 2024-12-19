from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ProjectViewSet, AnnotationViewSet

# Create a router and register the viewsets
router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'annotations', AnnotationViewSet, basename='annotation')

urlpatterns = [
    path('annotations/<int:id>/', AnnotationViewSet.as_view({'get': 'retrieve', 'put': 'update'}), name='annotation-detail'),
    path('', include(router.urls)),
]
