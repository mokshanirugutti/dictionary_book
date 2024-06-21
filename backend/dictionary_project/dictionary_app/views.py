import logging
from rest_framework import status
from django.utils import timezone
from rest_framework import generics
from .models import Word, SearchHistory
from .utils import fetch_word_definition
from rest_framework.response import Response
from .serializers import WordSerializer, SearchHistorySerializer

logger = logging.getLogger(__name__)

class WordListCreate(generics.ListCreateAPIView):
    queryset = Word.objects.all()
    serializer_class = WordSerializer

    def post(self, request, *args, **kwargs):
        word_text = request.data.get('word')
        logger.debug(f"Fetching definition for word: {word_text}")
        word_data = fetch_word_definition(word_text)
        
        if word_data:
            try:
                word, created = Word.objects.update_or_create(
                    word=word_text,
                    defaults={'definition_data': word_data['definitions']}  # Store the entire dictionary data
                )

                if created:
                    logger.debug(f"Created new word entry for: {word_text}")
                else:
                    logger.debug(f"Updated existing word entry for: {word_text}")

                # Create SearchHistory entry & Check if SearchHistory entry exists
                search_history, history_created = SearchHistory.objects.update_or_create(
                    word=word,
                    defaults={'search_timestamp': timezone.now()}
                )

                if history_created:
                    logger.debug(f"Created new SearchHistory entry for: {word_text}")
                else:
                    logger.debug(f"Updated SearchHistory entry for: {word_text}")

                return Response(WordSerializer(word).data, status=status.HTTP_201_CREATED)
            
            except Exception as e:
                logger.error(f"Error occurred while creating word and/or search history: {e}")
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response({'error': 'Word not found'}, status=status.HTTP_404_NOT_FOUND)
    
class SearchHistoryListCreate(generics.ListCreateAPIView):
    serializer_class = SearchHistorySerializer
    def get_queryset(self):
        return SearchHistory.objects.order_by('word', '-search_timestamp')

class SearchHistoryDelete(generics.DestroyAPIView):
    queryset = SearchHistory.objects.all()
    serializer_class = SearchHistorySerializer
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response({"message": "History entry deleted"}, status=status.HTTP_200_OK)

 