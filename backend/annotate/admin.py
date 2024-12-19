from django.contrib import admin
from .models import Annotation, Project

# Register your models here.
admin.site.register(Project)
admin.site.register(Annotation)