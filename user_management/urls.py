from django.urls import path
from . import views

app_name = 'user_management'

urlpatterns = [
    path('signup/', views.signup_view, name='signup'),
    path('login/', views.login_view, name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('admin_home/', views.admin_home, name='admin_home'),
    path('profile/', views.profile_view, name='profile'),
]