from django.db import models

# Create your models here.
class Login(models.Model):
    login_title = models.CharField(max_length=200)
    login_content = models.TextField()
    login_published = models.DateTimeField('date published')

    def __str__(self):
        return self.login_title