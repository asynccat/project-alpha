from django.contrib.auth import get_user_model

User = get_user_model()

def get_user_by_email(email):
    '''
    Returns user if he exists in the database.
    None otherwise.
    P.S. We need user's data to personnalize the password recovery e-mail.
    '''
    users = User.objects.all()
    for user in users:
        if user.email == email:
            return user
    return None
