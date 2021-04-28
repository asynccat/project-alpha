from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Update the structure of the response data.
    if response is not None:
        customized_response = dict()
        customized_response['errors'] = []

        for key, value in response.data.items():
            if isinstance(value, str):
                value = [value]
            error = {'field': key, 'message': value}
            customized_response['errors'].append(error)

        response.data = customized_response

    return response


def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)

    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }


def get_word_ending(days_number):
    if days_number == 1:
        return '1 day'
    return f'{days_number} days'