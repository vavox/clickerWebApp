from django.contrib.auth import authenticate
from rest_framework import exceptions, serializers
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_email_valid

from .models import User


def email_valid(value):
    message_invalid = 'Enter a valid email.'
    
    if not value:
        return False, message_invalid
    try:
        django_email_valid(value)
    except ValidationError:
        return False, message_invalid
    
    return True, ''


class RegistrationSerializer(serializers.ModelSerializer[User]):
    
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'full_name',
            'birth_date',
            'gender',
        ]

    def validate_email(self, value):
        valid, error_text = email_valid(value)

        if not valid:
            raise serializers.ValidationError(error_text)
        try:
            email_name, domain_part = value.strip().rsplit('@', 1)
        except ValueError:
            pass
        else:
            value = '@'.join([email_name, domain_part.lower()])

        return value

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.full_name = validated_data.get('full_name', '')
        user.birth_date = validated_data.get('birth_date', '')
        user.gender = validated_data.get('gender', '')
        user.save(update_fields=['full_name', 'birth_date', 'gender'])

        return user


class LoginSerializer(serializers.ModelSerializer[User]):
    email = serializers.CharField(max_length=255)
    username = serializers.CharField(max_length=255, read_only=True)
    password = serializers.CharField(max_length=128, write_only=True)
    is_staff = serializers.BooleanField(read_only=True)
    score = serializers.PrimaryKeyRelatedField(read_only=True)

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = User.objects.get(email=obj.email)

        return {'refresh': user.tokens['refresh'], 'access': user.tokens['access']}

    class Meta:
        model = User
        fields = [
            'email',
            'username',
            'password',
            'score',
            'tokens',
            'is_staff',
        ]

    def validate(self, data):
        email = data.get('email', None)
        password = data.get('password', None)
        if email is None:
            raise serializers.ValidationError('An email address is required to log in.')

        if password is None:
            raise serializers.ValidationError('A password is required to log in.')

        user = authenticate(username=email, password=password)

        if user is None:
            raise serializers.ValidationError('A user with this email and password was not found.')

        if not user.is_active:
            raise serializers.ValidationError('This user is not currently activated.')

        return user


class UserSerializer(serializers.ModelSerializer[User]):
    password = serializers.CharField(max_length=128, min_length=8, write_only=True)
    score = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = User
        fields = (
            'email',
            'username',
            'password',
            'full_name',
            'birth_date',
            'gender',
            'score',
            'tokens',
            'is_staff',
        )
        read_only_fields = ('tokens', 'is_staff')

    def update(self, instance, validated_data):

        password = validated_data.pop('password', None)

        for (key, value) in validated_data.items():
            setattr(instance, key, value)

        if password is not None:
            instance.set_password(password)

        instance.save()

        return instance

    
class LogoutSerializer(serializers.Serializer[User]):
    refresh = serializers.CharField()

    def validate(self, attrs):
        self.token = attrs['refresh']
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except TokenError as ex:
            raise exceptions.AuthenticationFailed(ex)