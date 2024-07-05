from django.core.mail import send_mail
from django.utils import timezone
from datetime import timedelta
from django.contrib.auth.models import User
import random
from django.conf import settings
class OTPService:
    def generate_otp(self):
        return random.randint(100000, 999999)

    def send_otp(self, user: User, purpose: str):
        otp = self.generate_otp()
        user.profile.otp = otp
        user.profile.otp_created_at = timezone.now()
        user.profile.otp_purpose = purpose
        user.profile.save()
        
        self._send_email(user.email, otp, purpose)

    def _send_email(self, email: str, otp: int, purpose: str):
        subject = 'Your OTP Code'
        message = f'Your OTP code for {purpose} is {otp}'
        send_mail(
            subject,
            message,
            f'dictionary_app <{settings.EMAIL_HOST_USER}>',
            [email],
            fail_silently=False,
        )
    
    def is_otp_valid(self, user: User, otp: int, purpose: str) -> bool:
        if user.profile.otp != otp or user.profile.otp_purpose != purpose:
            return False
        
        otp_age = timezone.now() - user.profile.otp_created_at
        if otp_age > timedelta(minutes=10):  # OTP is valid for 10 minutes
            return False

        return True
