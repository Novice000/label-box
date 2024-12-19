from statistics import mode
from django.db import models
from django.forms import CharField, ImageField, JSONField
from sqlalchemy import JSON

# Create your models here.
class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=255)
    
    def __str__(self):
        return f"In task {self.name} {self.desccription}"

class Annotation(models.Model):
    project = models.ForeignKey(Project, related_name="image", on_delete=models.CASCADE)
    image = models.URLField()
    data = models.JSONField( null=True, blank=True)