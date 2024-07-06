from rest_framework.views import APIView
from django.http import JsonResponse, HttpRequest
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password
from rest_framework.authtoken.models import Token
from .services import OTPService
from .serializers import UserCreationSerializer, UserLoginSerializer, VerifyRegistrationSerializer, RequestPasswordResetSerializer, VerifyPasswordResetSerializer
import json


@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(APIView):
    serializer_class = UserCreationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        data = json.loads(request.body)
        serializer = UserCreationSerializer(data=data)
        if serializer.is_valid():
            username = serializer.validated_data['username']
            password = serializer.validated_data['password']
            email = serializer.validated_data['email']
            user = User.objects.create(
                username=username,
                password=make_password(password),
                email=email,
                is_active=False  # User is inactive until email verification
            )

            self.otp_service.send_otp(user, 'registration')
            return JsonResponse({'message': 'User registered successfully. An OTP has been sent to your email.'}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class VerifyRegistrationOTPView(APIView):
    serializer_class = VerifyRegistrationSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        data = json.loads(request.body)
        serializer = VerifyRegistrationSerializer(data=data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = int(serializer.validated_data['otp'])
            user = User.objects.get(email=email)
            if self.otp_service.is_otp_valid(user, otp, 'registration'):
                user.is_active = True
                user.profile.otp = None
                user.profile.otp_created_at = None
                user.profile.otp_purpose = None
                user.profile.save()
                user.save()
                return JsonResponse({'message': 'OTP verified successfully. You can now log in.'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid or expired OTP'}, status=400)
        else:
            return JsonResponse(serializer.errors, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(APIView):
    serializer_class = UserLoginSerializer

    def post(self, request: HttpRequest, *args, **kwargs):
        data = json.loads(request.body)
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid():
            user = serializer.validated_data['user']
            token, _ = Token.objects.get_or_create(user=user)
            return JsonResponse({'message': 'Login successful', 'token': token.key})
        else:
            return JsonResponse(serializer.errors, status=400)


#  password reset
@method_decorator(csrf_exempt, name='dispatch')
class RequestPasswordResetView(APIView):
    serializer_class = RequestPasswordResetSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        data = json.loads(request.body)
        serializer = RequestPasswordResetSerializer(data=data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            user = User.objects.get(email=email)
            self.otp_service.send_otp(user, 'password reset')
            return JsonResponse({'message': 'OTP for password reset has been sent to your email.'}, status=200)
        else:
            return JsonResponse(serializer.errors, status=400)


@method_decorator(csrf_exempt, name='dispatch')
class VerifyPasswordResetOTPView(APIView):
    serializer_class = VerifyPasswordResetSerializer

    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        data = json.loads(request.body)
        serializer = VerifyPasswordResetSerializer(data=data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            otp = int(serializer.validated_data['otp'])
            new_password = serializer.validated_data['new_password']
            user = User.objects.get(email=email)

            if self.otp_service.is_otp_valid(user, otp, 'password reset'):
                user.password = make_password(new_password)
                user.profile.otp = None
                user.profile.otp_created_at = None
                user.profile.otp_purpose = None
                user.profile.save()
                user.save()
                return JsonResponse({'message': 'Password reset successfully. You can now log in with your new password.'}, status=200)
            else:
                return JsonResponse({'error': 'Invalid or expired OTP'}, status=400)
        else:
            return JsonResponse(serializer.errors, status=400)
