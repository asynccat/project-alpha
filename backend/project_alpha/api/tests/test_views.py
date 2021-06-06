import json
from unittest import mock

from django.urls import reverse
from django.core.exceptions import ValidationError

from rest_framework.test import APITestCase

from project_alpha.web.models import User


class ChangePasswordViewTestCase(APITestCase):

    def setUp(self):
        self.username = 'test@example.com'
        self.pwd = '1234QWERty'
        self.user = User.objects.create_user(self.username, self.pwd)

    def request(self, data):
        self.client.force_authenticate(user=self.user)  # pylint: disable=no-member
        response = self.client.post(reverse('change_password'), data=data, format='json')
        return response.status_code, json.loads(response.content)

    def test_happy_path(self):
        status_code, _ = self.request({
            'old_password': self.pwd,
            'new_password': '4321QWERty',
            'confirm_password': '4321QWERty',
        })

        self.assertEqual(status_code, 200)
        self.assertTrue(self.user.check_password('4321QWERty'))

    def test_require_missing_fields(self):
        status_code, content = self.request({
            'old_password': self.pwd,
            'new_password': '4321QWERty',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Required fields are missing or empty.')

        status_code, content = self.request({
            'new_password': '4321QWERty',
            'confirm_password': '4321QWERty',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Required fields are missing or empty.')

        status_code, content = self.request({
            'new_password': '4321QWERty',
            'old_password': None,
            'confirm_password': '4321QWERty',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Required fields are missing or empty.')

    def test_change_old_password_incorrect(self):
        status_code, content = self.request({
            'old_password': 'wrong password',
            'new_password': '4321QWERty',
            'confirm_password': '4321QWERty',
        })
        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Password is incorrect')

    def test_new_and_confirm_does_not_match(self):
        status_code, content = self.request({
            'old_password': self.pwd,
            'new_password': '4321QWERty',
            'confirm_password': '1111QWERty',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'New passwords does not match')

    def test_require_authorization(self):
        response = self.client.post(reverse('change_password'), data={
            'old_password': self.pwd,
            'new_password': '4321QWERty',
            'confirm_password': '4321QWERty',
        }, format='json')
        self.assertEqual(response.status_code, 401)


class UserCreateAPIViewTestCase(APITestCase):

    def request(self, data):
        response = self.client.post(reverse('sign_up'), data=data, format='json')
        return response.status_code, json.loads(response.content)

    def test_happy_path_unique_user_sign_up(self):
        status_code, _ = self.request({
            'email': 'test@fortest.test',
            'password': '4321QWERTYaaaaa',
        })
        self.assertEqual(status_code, 201)

    def test_not_unique_user_sign_up(self):
        # pylint: disable=attribute-defined-outside-init
        self.username = 'test@testnotunique.com'
        self.pwd = '1234QWERty'
        self.user = User.objects.create_user(self.username, self.pwd)
        status_code, _ = self.request({
            'email': 'test@testnotunique.com',
            'password': '4321QWERTYaaaaa',
        })
        self.assertEqual(status_code, 400)

    def test_mock_if_except_password_validation_error(self):
        with mock.patch('project_alpha.web.models.User.set_password', side_effect=ValidationError('test')):
            status_code, _ = self.request({
                'email': 'test@fort.test',
                'password': '4321QWERTYaaaaa',
            })
            self.assertEqual(status_code, 400)
