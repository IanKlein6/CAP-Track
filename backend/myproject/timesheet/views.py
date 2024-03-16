from django.shortcuts import render
from django.db.models import Sum
from rest_framework import viewsets, status, generics, APIView
from .models import Item, InvitationCode
from .serializers import ItemSerializer, UserSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
import logging

# View for user login
class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            response = Response(status=status.HTTP_200_OK)
            response.set_cookie('auth_token', token.key, httponly=True, samesite='Lax')
            logging.info(f"{username} has been authenticated")
            return response
        else:
            logging.info("authentication failed")
            return Response({"error": "Wrong Credentials"}, status=status.HTTP_400_BAD_REQUEST)
        
# View for user logout
class LogoutView(APIView):
    def post(self, request):
        response = Response(status=status.HTTP_200_OK)
        response.delete_cookie('auth_token')
        logging.info("Logout complete")
        return response

# View for creating a new user
class UserCreate(APIView):
    def post(self, request, format='json'):
        invitation_code_input = request.data.get("invitationCode")
        invitation_code = InvitationCode.objects.filter(code=invitation_code_input, is_used=False).first()
        if not invitation_code:
            return Response({"error": "Invalid or used invitation code"}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            invitation_code.is_used = True
            invitation_code.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# View for listing all users
class UserListView(generics.ListAPIView):
    queryset = get_user_model().objects.all()
    serializer_class = UserSerializer
    logging.info("User list returned")

# ViewSet for handling CRUD operations on Item
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer

# Logger for item operations
logger = logging.getLogger(__name__)

def get_item(request, item_id):
    logger.info(f'Fetching item with ID {item_id}')
    # Fetch and return the item...

def delete_item(request, item_id):
    logger.info(f'Deleting item with ID {item_id}')
    # Delete the item...



# def total_hours_per_job_site(year, week):
#     totals = WorkEntry.objects.filter(
#         calendar_year=year,
#         calendar_week=week,
#         deleted_at__isnull=True  # Considering only active (not soft-deleted) entries
#     ).values(
#         'job_site__name'  # Group by job site name
#     ).annotate(
#         total_hours=Sum('hours_worked')  # Sum hours worked per group
#     )
#     return totals

# def total_hours_for_week(year, week):
#     total = WorkEntry.objects.filter(
#         calendar_year=year,
#         calendar_week=week,
#         deleted_at__isnull=True
#     ).aggregate(
#         total_hours=Sum('hours_worked')  # Sum hours worked across all entries
#     )
#     return total['total_hours']

# Create your views here.
