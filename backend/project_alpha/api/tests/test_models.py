from rest_framework.test import APITestCase
from django.core.exceptions import ValidationError
from project_alpha.web.models import User


class UserModelSetPasswordTestCase(APITestCase):

    def setUp(self):
        self.username = 'test@example.com'
        self.user = User.objects.create_user(self.username)

    def test_happy_patch_all_validators_are_called_without_errors(self):
        result = self.user.set_password(raw_password='TestPassword123')
        self.assertEqual(result, None)

    def test_happy_patch_1_validator_failed_to_check(self):
        """
        Allowed to not pass only 1 validator.
        Passed validators: MinimumLengthValidator, UppercaseValidator, LowercaseValidator
        Failed validators: NumberValidator
        """
        result = self.user.set_password(raw_password='TestPassword')
        self.assertEqual(result, None)

    def test_weak_password_4_validators_failed_to_check(self):
        """
        Allowed to not pass only 1 validator.
        Failed validators: NumberValidator, MinimumLengthValidator, UppercaseValidator, LowercaseValidator
        """
        exceptions_count_must_be = 4
        with self.assertRaises(ValidationError) as context:
            self.user.set_password(raw_password='-')
        exceptions_count = len(context.exception.error_list)
        self.assertEqual(exceptions_count, exceptions_count_must_be)

    def test_weak_password_3_validators_failed_to_check(self):
        """
        Allowed to not pass only 1 validator.
        Passed validators: NumberValidator
        Failed validators: MinimumLengthValidator, UppercaseValidator, LowercaseValidator
        """
        exceptions_count_must_be = 3
        with self.assertRaises(ValidationError) as context:
            self.user.set_password(raw_password='123')
        exceptions_count = len(context.exception.error_list)
        self.assertEqual(exceptions_count, exceptions_count_must_be)

    def test_weak_password_2_validators_failed_to_check(self):
        """
        Allowed to not pass only 1 validator.
        Passed validators: NumberValidator, UppercaseValidator
        Failed validators: MinimumLengthValidator, UppercaseValidator
        """
        exceptions_count_must_be = 2
        with self.assertRaises(ValidationError) as context:
            self.user.set_password(raw_password='123A')
        exceptions_count = len(context.exception.error_list)
        self.assertEqual(exceptions_count, exceptions_count_must_be)
