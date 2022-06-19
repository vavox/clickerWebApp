from django.db import models

class UsersInChat(models.Model):
    user = models.OneToOneField(to='users.User', on_delete=models.CASCADE)
    connected = models.DateTimeField(auto_now_add=True, blank=True)

    def __str__(self):
        return f"{self.user.username} connected at {self.connected}"