import re


class PasswordValidator(object):
    """
    Password security check
    """

    def __init__(self, min_length=8):
        self.min_length = min_length

    def password_minimum_length_validate(self, password):
        """
        Check length of the password (must be >= 8)
        """
        if len(password) < self.min_length:
            raise ValueError('Your password must contain at least 8 characters.')

    def digit_in_password_validate(self, password):
        """
        Check availability of digits in the password (must be)
        """
        if not re.findall(r'\d', password):
            raise ValueError("Your password must contain at least 1 digit in range 0-9.")

    def uppercase_in_password_validate(self, password):
        """
        Check availability of uppercase letters in the password (must be)
        """
        if not re.findall(r'[A-Z]', password):
            raise ValueError("Your password must contain at least 1 uppercase letter, A-Z.")

    def lowercase_in_password_validate(self, password):
        """
        Check availability of lowercase letters in the password (must be)
        """
        if not re.findall(r'[a-z]', password):
            raise ValueError("Your password must contain at least 1 lowercase letter, a-z.")
