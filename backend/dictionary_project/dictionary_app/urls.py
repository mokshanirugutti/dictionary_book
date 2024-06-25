from django.urls import path
from .views import WordListCreate, SearchHistoryListCreate,SearchHistoryDelete,LoginView,RegisterView

urlpatterns = [
    path('words/', WordListCreate.as_view(), name='word-list-create'),
    path('search-history/', SearchHistoryListCreate.as_view(), name='search-history-list-create'),
    path('search-history/<int:pk>/', SearchHistoryDelete.as_view(), name='search-history-delete'),
    path('login/', LoginView.as_view(), name='login-view'),
    path('register/', RegisterView.as_view(), name='register-view'),
]
