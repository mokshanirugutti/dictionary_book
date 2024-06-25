from rest_framework import serializers
from .models import Word, SearchHistory

class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields = '__all__'

class SearchHistorySerializer(serializers.ModelSerializer):
    word = WordSerializer()
    user = serializers.ReadOnlyField(source='user.username') 

    class Meta:
        model = SearchHistory
        fields = '__all__'
