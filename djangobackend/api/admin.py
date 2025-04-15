from django.contrib import admin
from .models import farmer, Contact

@admin.register(farmer)
class FarmerAdmin(admin.ModelAdmin):
    list_display = ['id','name', 'email']
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'message')


# Register your models here.
