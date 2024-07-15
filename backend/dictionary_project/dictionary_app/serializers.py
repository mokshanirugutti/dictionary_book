from django.contrib.auth.hashers import check_password
from rest_framework import serializers
from .models import Word, SearchHistory
from django.contrib.auth.models import User


class WordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields =  '__all__'

class SearchWordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields =  ['word']
        
class SearchWordHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Word
        fields =  ['word', 'definition_data']


class SearchHistorySerializer(serializers.ModelSerializer):
    word = SearchWordHistorySerializer()
    user = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = SearchHistory
        fields = '__all__'


class UserCreationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    username = serializers.CharField()
    password = serializers.CharField(min_length=8)

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value


class VerifyRegistrationSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.IntegerField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Invalid email")
        return value

    def validate_otp(self, value):
        if value <= 0:
            raise serializers.ValidationError("Invalid OTP")
        return value


class UserLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        username = data.get('username')
        password = data.get('password')

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            raise serializers.ValidationError("Invalid username")
        if not check_password(password, user.password):
            raise serializers.ValidationError("Invalid password")
        if not user.is_active:
            raise serializers.ValidationError("Account is not yet activated")

        data['user'] = user
        return data


class RequestPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Invalid email")
        return value


class VerifyPasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField()
    otp = serializers.CharField()
    new_password = serializers.CharField(min_length=8)

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Invalid email")
        return value
