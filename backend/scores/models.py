from django.db import models

class Score(models.Model):
    user = models.OneToOneField('users.User', related_name='score', primary_key=True, on_delete=models.CASCADE)
    bytes = models.IntegerField(default=0)
    total_bytes = models.IntegerField(default=0)
    level = models.IntegerField(default=0)
    intern_quantity = models.IntegerField(default=0)
    junior_quantity = models.IntegerField(default=0)
    middle_quantity = models.IntegerField(default=0)
    senior_quantity = models.IntegerField(default=0)

    class Meta:
        ordering = ['-level']