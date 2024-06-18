from rest_framework.authentication import TokenAuthentication
from rest_framework.exceptions import AuthenticationFailed
from django.utils.deprecation import MiddlewareMixin

class CookieTokenAuthentication(TokenAuthentication):
    def authenticate(self, request):
        auth_cookie = request.COOKIES.get('auth_token')
        if not auth_cookie:
            return None
        try:
            user, token = self.authenticate_credentials(auth_cookie)
            request.user = user
            return (user, token)
        except AuthenticationFailed:
            return None

class CustomAuthMiddleware(MiddlewareMixin):
    def process_request(self, request):
        cookie_auth = CookieTokenAuthentication()
        result = cookie_auth.authenticate(request)
        if result is not None:
            request.user, _ = result
        else:
            request.user = None
