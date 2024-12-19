from rest_framework.serializers import ModelSerializer
from .models import Project, Annotation


class ProjectSerializer(ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"
        
        
class AnnotationSerializer(ModelSerializer):
    class Meta:
        model = Annotation
        fields = "__all__"