from rest_framework import serializers
from .models import Score


class ScoreSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Score
        fields = ['user', 'level', 'total_bytes', 'bytes',
                  'intern_quantity', 'junior_quantity',
                  'middle_quantity', 'senior_quantity']
        
    def create(self, validated_data):
        score, created = Score.objects.update_or_create(
            user=validated_data.get('user'),
            defaults={
                'level': validated_data.get('level', 0),
                'total_bytes': validated_data.get('total_bytes', 0),
                'bytes': validated_data.get('bytes', 0),
                'intern_quantity': validated_data.get('intern_quantity', 0),
                'junior_quantity': validated_data.get('junior_quantity', 0),
                'middle_quantity': validated_data.get('middle_quantity', 0),
                'senior_quantity': validated_data.get('senior_quantity', 0),
            }
        )
        
        return score