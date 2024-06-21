from django.urls import path
from .views import WordListCreate, SearchHistoryListCreate,SearchHistoryDelete

urlpatterns = [
    path('words/', WordListCreate.as_view(), name='word-list-create'),
    path('search-history/', SearchHistoryListCreate.as_view(), name='search-history-list-create'),
    path('search-history/<int:pk>/', SearchHistoryDelete.as_view(), name='search-history-delete'),
]
