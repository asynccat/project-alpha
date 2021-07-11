from typing import Optional
from django.contrib.auth import get_user_model

User = get_user_model()

def get_user_by_email(email) -> Optional[User]:
    try:
        user = User.objects.get(email=email)
        return user
    except: 
        return None
