from rest_framework import serializers
from .models import farmer, Contact

class FarmerSerializer(serializers.ModelSerializer):
    class Meta:
        model = farmer
        fields = ['id', 'name', 'email']
    
class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'