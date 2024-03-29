import re

from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _


# pylint: disable=unused-argument


class MinimumLengthValidator:
    def __init__(self, min_length=8):
        self.min_length = min_length

    def validate(self, password, user=None):
        if len(password) < self.min_length:
            raise ValidationError(
                _("The password must contain at least %(min_length)d characters."),
                code='password_too_short',
                params={'min_length': self.min_length},
            )


class NumberValidator:
    """
    Checks for digits in a password
    """

    def __init__(self, min_digits=0):
        self.min_digits = min_digits

    def validate(self, password, user=None):
        if not len(re.findall(r'\d', password)) >= self.min_digits:
            raise ValidationError(
                _("The password must contain at least %(min_digits)d digit(s), 0-9."),
                code='password_no_number',
                params={'min_digits': self.min_digits},
            )


class UppercaseValidator:
    """
    Checks for uppercase letters in a password
    """

    def validate(self, password, user=None):
        if not re.findall(r'[A-Z]', password):
            raise ValidationError(
                _("The password must contain at least 1 uppercase letter, A-Z."),
                code='password_no_upper',
            )


class LowercaseValidator:
    """
    Checks for lowercase letters in a password
    """

    def validate(self, password, user=None):
        if not re.findall(r'[a-z]', password):
            raise ValidationError(
                _("The password must contain at least 1 lowercase letter, a-z."),
                code='password_no_lower',
            )
