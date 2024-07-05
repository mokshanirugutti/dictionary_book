from django.contrib.auth.tokens import default_token_generator
from django.views import View
from django.http import JsonResponse, HttpRequest
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.contrib.auth.hashers import make_password,check_password
from rest_framework.authtoken.models import Token
from .services import OTPService
import json

# user creation 
@method_decorator(csrf_exempt, name='dispatch')
class RegisterView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        try: 
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
            email = data.get('email')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not username or not password or not email:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        if User.objects.filter(username=username).exists():
            return JsonResponse({'error': 'Username already taken'}, status=400)

        if User.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Email already in use'}, status=400)

        user = User.objects.create(
            username=username,
            password=make_password(password),
            email=email,
            is_active=False  # User is inactive until email verification
        )

        self.otp_service.send_otp(user, 'registration')
        return JsonResponse({'message': 'User registered successfully. An OTP has been sent to your email.'}, status=200)

@method_decorator(csrf_exempt, name='dispatch')
class VerifyRegistrationOTPView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            otp = int(data.get('otp'))
        except (json.JSONDecodeError, ValueError):
            return JsonResponse({'error': 'Invalid JSON or OTP'}, status=400)

        if not email or not otp:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid email'}, status=400)

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


@method_decorator(csrf_exempt, name='dispatch')
class LoginView(View):
    def post(self, request: HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
            username = data.get('username')
            password = data.get('password')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not username or not password:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

        if not check_password(password, user.password):
            return JsonResponse({'error': 'Invalid credentials'}, status=400)

        if not user.is_active:
            return JsonResponse({'error': 'Account is not active. Please verify your email.'}, status=400)

        token, _ = Token.objects.get_or_create(user=user)
        return JsonResponse({'message': 'Login successful', 'token': token.key})




#  password reset
@method_decorator(csrf_exempt, name='dispatch')
class RequestPasswordResetView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
            email = data.get('email')
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

        if not email:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid email'}, status=400)

        self.otp_service.send_otp(user, 'password reset')
        return JsonResponse({'message': 'OTP for password reset has been sent to your email.'}, status=200)


@method_decorator(csrf_exempt, name='dispatch')
class VerifyPasswordResetOTPView(View):
    def __init__(self, **kwargs):
        super().__init__(**kwargs)
        self.otp_service = OTPService()

    def post(self, request: HttpRequest, *args, **kwargs):
        try:
            data = json.loads(request.body)
            email = data.get('email')
            otp = int(data.get('otp'))
            new_password = data.get('new_password')
        except (json.JSONDecodeError, ValueError):
            return JsonResponse({'error': 'Invalid JSON or OTP'}, status=400)

        if not email or not otp or not new_password:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return JsonResponse({'error': 'Invalid email'}, status=400)

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
