from django.urls import path
from api import views
from .views import ContactCreateView

urlpatterns = [
    path('farmer/', views.FarmerList.as_view()),
    path('contact/', ContactCreateView.as_view(), name='contact-create')
]
