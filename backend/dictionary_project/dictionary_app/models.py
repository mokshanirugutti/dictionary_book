from django.db import models
from django.contrib.auth.models import User

class Word(models.Model):
    word = models.CharField(max_length=255, unique=True)
    definition_data = models.JSONField()  # Use JSONField to store definitions and examples

    def __str__(self):
        return self.word

class SearchHistory(models.Model):
    word = models.ForeignKey(Word, on_delete=models.CASCADE)
    search_timestamp = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE) 

    def __str__(self):
        return f"{self.word.word} searched at {self.search_timestamp}"
