import logging
from rest_framework import status
from django.utils import timezone
from rest_framework import generics
from django.http import HttpRequest
from .models import Word, SearchHistory
from .utils import fetch_word_definition
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http import HttpRequest, JsonResponse
from django.core.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from .serializers import WordSerializer, SearchHistorySerializer

logger = logging.getLogger(__name__)

class WordListCreate(APIView):
    serializer_class = WordSerializer
    def post(self, request: HttpRequest, *args, **kwargs):
        # print('post request came')
        try:
            # print('in try')
            user = request.user
            if not user.is_authenticated:
                return JsonResponse({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)

            # print('got user')
            data = request.data
            word_text = data.get('word')
            # print(f'got word {word_text}')
            if not word_text:
                return JsonResponse({'error': 'Missing "word" field in request data'}, status=status.HTTP_400_BAD_REQUEST)

            # print(f"Request user: {user.username}")

            # Check if the word already exists
            word = Word.objects.filter(word=word_text).first()
            if not word:
                definition_data = fetch_word_definition(word_text)
                if 'error' in definition_data:
                    return JsonResponse({'error': 'Failed to fetch word definition'}, status=status.HTTP_400_BAD_REQUEST)
                
                word = Word.objects.create(
                    word=word_text,
                    definition_data=definition_data['definitions']
                )
                logger.debug(f"Created new word entry: {word_text}")


            # Check if search history entry already exists for the word and user
            search_history_exists = SearchHistory.objects.filter(word=word, user=user).exists()

            # Update search history timestamp if entry exists, otherwise create a new one
            if search_history_exists:
                SearchHistory.objects.filter(word=word, user=user).update(search_timestamp=timezone.now())
                logger.debug(f"Updated search history timestamp for word: {word_text}")
            else:
                search_history = SearchHistory.objects.create(word=word, user=user)
                logger.debug(f"Created search history entry for word: {word_text}")

            # Serialize and return response
            serializer = WordSerializer(word)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        except Exception as e:
            logger.error(f"Error creating word and/or search history: {e}")
            return JsonResponse({'error': 'Failed to create word and/or search history'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SearchHistoryListCreate(APIView):
    serializer_class = SearchHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        logger.debug(f"Fetching search history for user: {self.request.user.username}")
        # Return search histories of the logged-in user
        queryset = SearchHistory.objects.filter(user=self.request.user).order_by('-search_timestamp')
        return queryset

    def get(self, request, *args, **kwargs):
        try:
            queryset = self.get_queryset()
            serializer = self.serializer_class(queryset, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Error fetching search history: {e}")
            return JsonResponse({'error': 'Failed to fetch search history'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SearchHistoryDelete(generics.DestroyAPIView):
    queryset = SearchHistory.objects.all()
    serializer_class = SearchHistorySerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        obj = super().get_object()
        if obj.user != self.request.user:
            raise PermissionDenied("You do not have permission to delete this entry.")
        return obj

    def destroy(self, request, *args, **kwargs):
        try:
            instance = self.get_object()
            self.perform_destroy(instance)
            return Response({"message": "History entry deleted"}, status=status.HTTP_200_OK)
        except PermissionDenied as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_403_FORBIDDEN)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)