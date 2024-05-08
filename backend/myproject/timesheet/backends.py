from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
import logging

# Configure logging
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

print("backend 1")
class EmailBackend(ModelBackend):
    print("backend 2")
    def authenticate(self, request, username=None, password=None, **kwargs):
        print("backend 3")
        UserModel = get_user_model()
        try:
            print("backend 4")
            user = UserModel.objects.get(email=username)  # Using email to fetch the user
            if user.check_password(password):
                print("backend 5")
                logger.info(f"User authenticated successfully: {user.email}")
                return user
            else:
                print("backend 6")
                logger.warning(f"Password mismatch for user: {user.email}")
                logger.info(f"Checked password: {password}")
        except UserModel.DoesNotExist:
            print("backend 7")
            logger.error(f"User not found with email: {username}")

        return None

    def get_user(self, user_id):
        print("backend 8")
        UserModel = get_user_model()
        try:
            print("backend 9")
            user = UserModel.objects.get(pk=user_id)
            logger.info(f"User retrieved with ID: {user_id}")
            return user
        except UserModel.DoesNotExist:
            print("backend 10")
            logger.error(f"User not found with ID: {user_id}")
            return None
