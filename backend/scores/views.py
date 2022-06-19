from django.shortcuts import render
from rest_framework.permissions import IsAuthenticatedOrReadOnly, BasePermission, IsAuthenticated, SAFE_METHODS
from rest_framework.response import Response
from rest_framework import generics, viewsets, status
from django.shortcuts import get_object_or_404
from .models import Score
from .serializers import ScoreSerializer


class ScoresViewSet(viewsets.ViewSet):

    permission_classes = [IsAuthenticatedOrReadOnly,]

    def list(self, request):
        scores = Score.objects.all()
        serializer = ScoreSerializer(scores, many=True)
        return Response(serializer.data)

    def create(self, request):
        serializer = ScoreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, pk=None):
        queryset = Score.objects.all()
        score = get_object_or_404(queryset, pk=pk)
        serializer = ScoreSerializer(score)
        return Response(serializer.data)

    def update(self, request, pk=None):
        score = Score.objects.get(pk=pk)
        if request.user != score.user:
            return Response({'message': "you do not have permission to do this action"},
            status=status.HTTP_403_FORBIDDEN)
        serializer = ScoreSerializer(score, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk=None):
        score = Score.objects.get(pk=pk)
        if request.user != score.user:
            return Response({'message': "you do not have permission to do this action"},
            status=status.HTTP_403_FORBIDDEN)
        score.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class ReadOnly(BasePermission):
    def has_permission(self, request, view):
        return request.method in SAFE_METHODS


class UserScoreView (generics.ListAPIView):
    serializer_class = ScoreSerializer
    permission_classes = [IsAuthenticated, ReadOnly]
    queryset = Score.objects.all()

    def get_queryset(self):
        return super().get_queryset().filter(post=self.kwargs.get('user_id'))