from django.shortcuts import render
from .serializer import FarmerSerializer, ContactSerializer
from rest_framework.generics import ListAPIView
from .models import farmer, Contact
from rest_framework import generics


class FarmerList(ListAPIView):
    queryset = farmer.objects.all()
    serializer_class = FarmerSerializer


class ContactCreateView(generics.CreateAPIView):
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer