# views.py
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.views import APIView
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.conf import settings
from django.contrib.auth.hashers import check_password
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from .models import NGOUser, Donor
from rest_framework.permissions import AllowAny
from .serializer import (
    NGOUserSerializer, 
    DonorSerializer,
    RequestPasswordResetSerializer,
    PasswordResetConfirmSerializer
)
import os

class NGOUserCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """Endpoint documentation for NGO registration"""
        return Response({
            "message": "Please use POST method to register an NGO",
            "required_fields": NGOUserSerializer().get_fields_description()
        })

    def post(self, request):
        """Handle NGO registration"""
        serializer = NGOUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'message': 'NGO registration successful',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'error',
            'message': 'Validation failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class DonorCreateView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """Endpoint documentation for Donor registration"""
        return Response({
            "message": "Please use POST method to register as a donor",
            "required_fields": DonorSerializer().get_fields_description()
        })

    def post(self, request):
        """Handle Donor registration"""
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'message': 'Donor registration successful',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'error',
            'message': 'Validation failed',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        """Authentication endpoint for both NGO and Donor users"""
        email = request.data.get('email')
        password = request.data.get('password')

        # Validate required fields
        if not email or not password:
            return Response(
                {'message': 'Email and password are required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Try NGO user first
        try:
            ngo_user = NGOUser.objects.get(email=email)
            if check_password(password, ngo_user.password):
                refresh = RefreshToken.for_user(ngo_user)
                refresh['user_type'] = 'ngo'  # Custom claim
                return Response({
                    'token': str(refresh.access_token),
                    'user': {
                        'id': ngo_user.id,
                        'email': ngo_user.email,
                        'organization': ngo_user.organization,
                        'user_type': 'ngo',
                        'first_name': ngo_user.first_name,
                        'last_name': ngo_user.last_name
                    }
                }, status=status.HTTP_200_OK)
            return Response(
                {'message': 'Invalid password'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        except NGOUser.DoesNotExist:
            pass  # Proceed to check Donor

        # Try Donor user
        try:
            donor = Donor.objects.get(email=email)
            if check_password(password, donor.password):
                refresh = RefreshToken.for_user(donor)
                refresh['user_type'] = 'donor'  # Custom claim
                return Response({
                    'token': str(refresh.access_token),
                    'user': {
                        'id': donor.id,
                        'email': donor.email,
                        'first_name': donor.first_name,
                        'last_name': donor.last_name,
                        'user_type': donor.user_type,
                        'other_type': donor.other_type
                    }
                }, status=status.HTTP_200_OK)
            return Response(
                {'message': 'Invalid password'}, 
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Donor.DoesNotExist:
            return Response(
                {'message': 'No account found with this email'},
                status=status.HTTP_404_NOT_FOUND
            )

class VerifyTokenView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """Token validation and user data retrieval"""
        try:
            auth = JWTAuthentication()
            header = auth.get_header(request)
            
            if not header:
                return Response(
                    {'valid': False, 'message': 'Missing Authorization header'},
                    status=status.HTTP_401_UNAUTHORIZED
                )

            raw_token = auth.get_raw_token(header)
            validated_token = auth.get_validated_token(raw_token)
            
            user_type = validated_token.get('user_type')
            user_id = validated_token['user_id']

            if user_type == 'ngo':
                user = NGOUser.objects.get(id=user_id)
                user_data = {
                    'id': user.id,
                    'email': user.email,
                    'organization': user.organization,
                    'user_type': 'ngo',
                    'first_name': user.first_name,
                    'last_name': user.last_name
                }
            elif user_type == 'donor':
                user = Donor.objects.get(id=user_id)
                user_data = {
                    'id': user.id,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                    'user_type': user.user_type,
                    'other_type': user.other_type
                }
            else:
                return Response(
                    {'valid': False, 'message': 'Invalid user type'},
                    status=status.HTTP_400_BAD_REQUEST
                )

            return Response({'valid': True, 'user': user_data})

        except (NGOUser.DoesNotExist, Donor.DoesNotExist):
            return Response(
                {'valid': False, 'message': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except (InvalidToken, TokenError) as e:
            return Response(
                {'valid': False, 'message': str(e)},
                status=status.HTTP_401_UNAUTHORIZED
            )
        except Exception as e:
            return Response(
                {'valid': False, 'message': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

# Password Reset Views (NGO-only in this example)
class RequestPasswordResetView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        """Handle password reset requests for NGO users"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        email = serializer.validated_data['email']

        try:
            user = NGOUser.objects.get(email=email)
            token = default_token_generator.make_token(user)
            reset_url = f"{os.getenv('FRONTEND_URL', 'http://localhost:3000')}/reset-password?token={token}&email={email}"

            send_mail(
                'Password Reset Request',
                f'Use this link to reset your password: {reset_url}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return Response(
                {"status": "success", "message": "Password reset email sent"},
                status=status.HTTP_200_OK
            )
        except NGOUser.DoesNotExist:
            return Response(
                {"message": "No NGO account with this email"},
                status=status.HTTP_404_NOT_FOUND
            )

class PasswordResetConfirmView(generics.GenericAPIView):
    serializer_class = PasswordResetConfirmSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        """Handle password reset confirmation"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        try:
            user = NGOUser.objects.get(email=serializer.validated_data['email'])
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            return Response(
                {"status": "success", "message": "Password updated successfully"},
                status=status.HTTP_200_OK
            )
        except NGOUser.DoesNotExist:
            return Response(
                {"message": "User not found"}, 
                status=status.HTTP_404_NOT_FOUND
            )

# List Views
class NGOListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    queryset = NGOUser.objects.all()
    serializer_class = NGOUserSerializer

class DonorListView(generics.ListAPIView):
    permission_classes = [AllowAny]
    serializer_class = DonorSerializer

    def get_queryset(self):
        queryset = Donor.objects.all()
        ngo_id = self.request.query_params.get('ngo_id')
        if ngo_id:
            queryset = queryset.filter(associated_ngo_id=ngo_id)
        return queryset