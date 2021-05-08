import json
from django.urls import reverse
from rest_framework.test import APITestCase
from web.models import User


class ChangePasswordViewTestCase(APITestCase):

    def setUp(self):
        self.username = 'test@example.com'
        self.pwd = '1234'
        self.user = User.objects.create_user(self.username, self.pwd)

    def request(self, data):
        self.client.force_authenticate(user=self.user)
        response = self.client.post(reverse('change_password'), data=data, format='json')
        return response.status_code, json.loads(response.content)

    def test_happy_path(self):
        status_code, _ = self.request({
            'old_password': self.pwd,
            'new_password': '4321',
            'confirm_password': '4321',
        })

        self.assertEqual(status_code, 200)
        self.assertTrue(self.user.check_password('4321'))

    def test_require_missing_fields(self):
        status_code, content = self.request({
            'old_password': self.pwd,
            'new_password': '4321',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Required fields are missing or empty.')

        status_code, content = self.request({
            'new_password': '4321',
            'confirm_password': '4321',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Required fields are missing or empty.')

        status_code, content = self.request({
            'new_password': '4321',
            'old_password': None,
            'confirm_password': '4321',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Required fields are missing or empty.')

    def test_change_old_password_incorrect(self):
        status_code, content = self.request({
            'old_password': 'wrong password',
            'new_password': '4321',
            'confirm_password': '4321',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'Password is incorrect')

    def test_new_and_confirm_does_not_match(self):
        status_code, content = self.request({
            'old_password': self.pwd,
            'new_password': '4321',
            'confirm_password': '1111',
        })

        self.assertEqual(status_code, 400)
        self.assertEqual(content['error'], 'New passwords does not match')

    def test_require_authorization(self):
        response = self.client.post(reverse('change_password'), data={
            'old_password': self.pwd,
            'new_password': '4321',
            'confirm_password': '4321',
        }, format='json')
        self.assertEqual(response.status_code, 401)