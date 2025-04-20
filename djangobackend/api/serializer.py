from rest_framework import serializers
from .models import NGOUser, Donor
from django.contrib.auth.hashers import make_password
from django.core.validators import RegexValidator
from django.contrib.auth.tokens import default_token_generator

class BaseSerializer(serializers.ModelSerializer):
    """Base serializer with common functionality"""
    password = serializers.CharField(write_only=True, required=True)
    
    @classmethod
    def get_fields_description(cls):
        """Generate automatic field documentation"""
        return {
            field_name: {
                'type': str(field.__class__.__name__),
                'required': field.required,
                'help_text': str(field.help_text) if field.help_text else ''
            }
            for field_name, field in cls().get_fields().items()
        }

    def validate_phone_number(self, value):
        phone_regex = RegexValidator(
            regex=r'^\+?1?\d{9,15}$',
            message="Phone number must be in format: '+999999999'."
        )
        phone_regex(value)
        return value

    def validate_postal_code(self, value):
        postal_regex = RegexValidator(
            regex=r'^\d{6}$',
            message="Postal code must be 6 digits."
        )
        postal_regex(value)
        return value

    def validate_agreed_to_terms(self, value):
        if not value:
            raise serializers.ValidationError("You must agree to the terms")
        return value

    def create_user(self, validated_data, model_class):
        """Common user creation logic"""
        password = validated_data.pop('password')
        validated_data['password'] = make_password(password)
        return model_class.objects.create_user(**validated_data)

class NGOUserSerializer(BaseSerializer):
    class Meta:
        model = NGOUser
        fields = [
            'id', 'email', 'password', 'first_name', 'last_name',
            'organization', 'phone_number', 'postal_code', 'colony',
            'city', 'state', 'agreed_to_terms'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'organization': {'required': True},
            'phone_number': {'required': True},
            'postal_code': {'required': True},
            'colony': {'required': True},
            'city': {'required': True},
            'state': {'required': True},
            'agreed_to_terms': {'required': True}
        }

    def create(self, validated_data):
        return super().create_user(validated_data, NGOUser)

class DonorSerializer(BaseSerializer):
    associated_ngo = serializers.PrimaryKeyRelatedField(
        queryset=NGOUser.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Donor
        fields = [
            'id', 'email', 'first_name', 'last_name', 'user_type', 'other_type',
            'phone_number', 'postal_code', 'colony', 'city', 'state', 
            'agreed_to_terms', 'password', 'associated_ngo', 'date_joined'
        ]
        extra_kwargs = {
            'email': {'required': True},
            'first_name': {'required': True},
            'last_name': {'required': True},
            'user_type': {'required': True},
            'phone_number': {'required': True},
            'postal_code': {'required': True},
            'colony': {'required': True},
            'city': {'required': True},
            'state': {'required': True},
            'agreed_to_terms': {'required': True}
        }

    def validate(self, data):
        if data.get('user_type') == 'other' and not data.get('other_type'):
            raise serializers.ValidationError(
                "Please specify your type when selecting 'Other'"
            )
        return data

    def create(self, validated_data):
        return super().create_user(validated_data, Donor)

class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    user_type = serializers.ChoiceField(
        choices=['ngo', 'donor'],
        required=True,
        help_text="Specify 'ngo' or 'donor'"
    )

    def validate(self, data):
        model = NGOUser if data['user_type'] == 'ngo' else Donor
        if not model.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError(
                f"No {data['user_type']} user found with this email"
            )
        return data

class PasswordResetConfirmSerializer(serializers.Serializer):
    token = serializers.CharField()
    email = serializers.EmailField()
    user_type = serializers.ChoiceField(
        choices=['ngo', 'donor'],
        required=True
    )
    new_password = serializers.CharField(min_length=8, write_only=True)
    confirm_password = serializers.CharField(min_length=8, write_only=True)

    def validate(self, data):
        # Password matching validation
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")

        # Get appropriate user model
        model = NGOUser if data['user_type'] == 'ngo' else Donor
        
        try:
            user = model.objects.get(email=data['email'])
        except model.DoesNotExist:
            raise serializers.ValidationError("Invalid email address")

        # Token validation
        if not default_token_generator.check_token(user, data['token']):
            raise serializers.ValidationError("Invalid or expired reset token")

        data['user'] = user
        return data