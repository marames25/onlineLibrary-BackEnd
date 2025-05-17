from django.contrib.auth.models import User
from django.db import models
from book_admin.models import Book

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    borrowed_books = models.ManyToManyField(Book, related_name='borrowers', blank=True)
    favorite_books = models.ManyToManyField(Book, related_name='fans', blank=True)

    def __str__(self):
        return self.user.username
