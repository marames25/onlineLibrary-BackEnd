from django.urls import path
from . import views
from django.views.generic import TemplateView

app_name = 'books'

urlpatterns = [
    path('', views.books_view, name='book_user_home'), 
    path('profile/', views.profile_view, name='profile'),
    path('favourites/', views.favourites_view, name='favourites'),
    path('borrow/', views.borrow_book, name='borrow_book'),
    path('favorite/add/', views.add_favorite, name='add_favorite'),
    path('favorite/remove/', views.remove_favorite, name='remove_favorite'),

    path('services/', TemplateView.as_view(template_name='services.html'), name='services'),
    path('about/', TemplateView.as_view(template_name='about.html'), name='about'),
    path('contact-us/', TemplateView.as_view(template_name='contactUs.html'), name='contact_us'),
]