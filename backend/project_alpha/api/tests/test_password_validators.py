from django.test import TestCase
from django.core.exceptions import ValidationError

from project_alpha.web.utils.password_validator import (MinimumLengthValidator,
                                                        NumberValidator,
                                                        LowercaseValidator,
                                                        UppercaseValidator)


class MinimumLengthValidatorTestCase(TestCase):

    def test_not_valid_if_length_less_than_minimal(self):
        try:
            MinimumLengthValidator().validate(password='12345')
        except ValidationError as err:
            self.assertEqual(err.messages[0], 'The password must contain at least 8 characters.')

    def test_valid_if_length_more_or_equal_than_minimal(self):
        result = MinimumLengthValidator().validate(password='123456789')
        self.assertEqual(result, None)


class NumberValidatorTestCase(TestCase):

    def test_not_valid_if_password_not_contains_digits(self):
        try:
            NumberValidator().validate(password='qwerty')
        except ValidationError as err:
            self.assertEqual(err.messages[0], 'The password must contain at least 1 digit(s), 0-9.')

    def test_valid_if_password_contains_digits(self):
        result = NumberValidator().validate(password='123456789')
        self.assertEqual(result, None)


class LowercaseValidatorTestCase(TestCase):

    def test_not_valid_if_password_not_contains_lowercase_letters(self):
        try:
            LowercaseValidator().validate(password='QWERTY')
        except ValidationError as err:
            self.assertEqual(err.messages[0], 'The password must contain at least 1 lowercase letter, a-z.')

    def test_valid_if_password_contains_lowercase_letters(self):
        result = LowercaseValidator().validate(password='qwerty')
        self.assertEqual(result, None)


class UppercaseValidatorTestCase(TestCase):

    def test_not_valid_if_password_not_contains_uppercase_letters(self):
        try:
            UppercaseValidator().validate(password='qwerty')
        except ValidationError as err:
            self.assertEqual(err.messages[0], 'The password must contain at least 1 uppercase letter, A-Z.')

    def test_valid_if_password_contains_uppercase_letters(self):
        result = UppercaseValidator().validate(password='QWERTY')
        self.assertEqual(result, None)
