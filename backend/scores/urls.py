import imp
from django.urls import path
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from django.urls import include, path

from .views import ScoresViewSet, UserScoreView

app_name = 'scores'

router = DefaultRouter()
router.register(r'scores', ScoresViewSet, basename="scores")

urlpatterns = [
    path('', include(router.urls)),
    path('api/scores/<str:user_id>/', UserScoreView.as_view())
]