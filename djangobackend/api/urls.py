# from django.urls import path
# from api import views
# from .views import ContactCreateView

# urlpatterns = [
#     path('farmer/', views.FarmerList.as_view()),
#     path('contact/', ContactCreateView.as_view(), name='contact-create')
# ]

# from django.urls import path
from djangobackend.urls import path
from .views import (
    NGOUserCreateView,
    NGOListView
)

urlpatterns = [
    path('ngo/signup/', NGOUserCreateView.as_view(), name='ngo_signup'),
    path('ngo/list/', NGOListView.as_view(), name='ngo_list'),
]
