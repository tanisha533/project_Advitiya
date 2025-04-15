from django.db import models

# Create your models here.
class farmer(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

class Contact(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    message = models.TextField()
