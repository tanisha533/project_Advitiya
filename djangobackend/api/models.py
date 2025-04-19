# from django.db import models

# # Create your models here.
# class farmer(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)

# class Contact(models.Model):
#     name = models.CharField(max_length=100)
#     email = models.EmailField()
#     message = models.TextField()

from django.contrib.auth.models import AbstractUser
from django.db import models

class NGOUser(AbstractUser):
    email = models.EmailField(unique=True)  # <-- Add this line

    # Inherits fields: username, password, email, first_name, last_name
    organization = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=20)
    colony = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    agreed_to_terms = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    # Use email as username
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['organization', 'first_name', 'last_name']

    def __str__(self):
        return self.organization

