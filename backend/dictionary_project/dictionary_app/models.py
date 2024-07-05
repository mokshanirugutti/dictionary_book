from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class Word(models.Model):
    word = models.CharField(max_length=255, unique=True)
    definition_data = models.JSONField() 

    def __str__(self):
        return self.word

class SearchHistory(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    search_timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.word.word} searched at {self.search_timestamp}"

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    otp = models.IntegerField(null=True, blank=True)
    otp_created_at = models.DateTimeField(null=True, blank=True)
    otp_purpose = models.CharField(max_length=50, null=True, blank=True)
    
    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
