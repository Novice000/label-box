from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from .models import Annotation, Project
from .serializers import ProjectSerializer, AnnotationSerializer # type: ignore



class ProjectViewSet(ModelViewSet):
    serializer_class = ProjectSerializer
    
    def get_queryset(self):
    # Filter projects where related annotations have null data
        return Project.objects.filter(image__data__isnull=True)

class AnnotationViewSet(ModelViewSet):
    serializer_class = AnnotationSerializer
    queryset = Annotation.objects.all()

    def retrieve(self, request, *args, **kwargs):
        # Retrieve an annotation by project ID
        project_id = self.kwargs.get("id")  # Ensure "id" is quoted
        try:
            annotation = Annotation.objects.get(project__id=project_id)
            serializer = self.get_serializer(annotation)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Annotation.DoesNotExist:
            return Response(
                {"error": "Annotation not found for the given project ID"},
                status=status.HTTP_404_NOT_FOUND,
            )

    def update(self, request, *args, **kwargs):
        # Update an annotation by ID
        annotation_id = self.kwargs.get("id")
        try:
            annotation = Annotation.objects.get(id=annotation_id)
            serializer = self.get_serializer(annotation, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Annotation.DoesNotExist:
            return Response(
                {"error": "Annotation not found"},
                status=status.HTTP_404_NOT_FOUND,
            )
