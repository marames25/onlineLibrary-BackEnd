from django.db import models

# Create your models here.
class Book(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=100)
    description = models.TextField()
    cover = models.ImageField(upload_to='books_covers/', blank=True, null=True)
    

    

    def __str__(self): 
        return self.title