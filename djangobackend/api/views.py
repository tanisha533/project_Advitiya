# from django.shortcuts import render
# from .serializer import FarmerSerializer, ContactSerializer
# from rest_framework.generics import ListAPIView
# from .models import farmer, Contact
# from rest_framework import generics


# class FarmerList(ListAPIView):
#     queryset = farmer.objects.all()
#     serializer_class = FarmerSerializer


# class ContactCreateView(generics.CreateAPIView):
#     queryset = Contact.objects.all()
#     serializer_class = ContactSerializer

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from .models import NGOUser
from .serializer import (
    NGOUserSerializer, 
    RequestPasswordResetSerializer,
    PasswordResetConfirmSerializer
)
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail
from django.conf import settings
import os

class NGOUserCreateView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        # Return a simple response for GET requests
        return Response({
            "message": "Please use POST method to register an NGO",
            "required_fields": {
                "first_name": "Your first name",
                "last_name": "Your last name",
                "organization": "Your NGO name",
                "email": "Your email address",
                "password": "Your password (min 8 characters)",
                "phone_number": "Your phone number (+91XXXXXXXXXX)",
                "postal_code": "6-digit postal code",
                "colony": "Your colony/area",
                "city": "Your city",
                "state": "Your state",
                "agreed_to_terms": "true/false"
            }
        })

    def post(self, request):
        serializer = NGOUserSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response({
                'status': 'success',
                'message': 'NGO registration successful',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'status': 'error',
                'message': str(e),
                'errors': serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

class RequestPasswordResetView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = NGOUser.objects.get(email=email)
                # Generate password reset token
                token = default_token_generator.make_token(user)
                
                # Send password reset email
                reset_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token={token}&email={email}"
                
                send_mail(
                    'Password Reset Request',
                    f'Click the following link to reset your password: {reset_url}',
                    'noreply@connectrj.com',
                    [email],
                    fail_silently=False,
                )
                
                return Response({
                    "status": "success",
                    "message": "Password reset email has been sent."
                }, status=status.HTTP_200_OK)
                
            except NGOUser.DoesNotExist:
                return Response({
                    "status": "error",
                    "message": "No user found with this email address"
                }, status=status.HTTP_404_NOT_FOUND)
                
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = NGOUser.objects.get(email=serializer.validated_data['email'])
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            return Response({
                "status": "success",
                "message": "Password has been reset successfully."
            }, status=status.HTTP_200_OK)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class NGOListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = NGOUser.objects.all()
    serializer_class = NGOUserSerializer