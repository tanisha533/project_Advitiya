from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin


class DonorManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, password, **extra_fields)


class NGOUser(AbstractBaseUser, PermissionsMixin):
    username = None  # Remove default username field

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    organization = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=20)
    colony = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    agreed_to_terms = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='ngo_user_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='ngo_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['organization']

    def __str__(self):
        return self.organization


class Donor(AbstractBaseUser, PermissionsMixin):
    USER_TYPE_CHOICES = [
        ('farmer', 'Farmer'),
        ('retailer', 'Retailer'),
        ('business', 'Business Owner'),
        ('donor', 'Donor'),
        ('other', 'Others')
    ]

    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    other_type = models.CharField(max_length=100, blank=True, null=True)
    phone_number = models.CharField(max_length=20)
    postal_code = models.CharField(max_length=20)
    colony = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    agreed_to_terms = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    associated_ngo = models.ForeignKey(
        NGOUser,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='donors',
        help_text='The NGO this donor is associated with'
    )

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='donor_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='donor_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    objects = DonorManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'user_type']

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.get_user_type_display()})"
