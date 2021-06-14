import json
from unittest import mock

from django.urls import reverse
from django.core.exceptions import ValidationError

from rest_framework.test import APITestCase

from project_alpha.web.models import User, UserSettings


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

    def test_mock_happy_path_unique_user_sign_up(self):
        with mock.patch('project_alpha.web.models.User.validate', return_value=True):
            status_code, _ = self.request({
                'email': 'test@fortest.test',
                'password': '432',
            })
            self.assertEqual(status_code, 201)

    def test_not_unique_user_sign_up(self):
        username = 'test@testnotunique.com'
        pwd = '1234QWERty'
        User.objects.create_user(username, pwd)
        status_code, _ = self.request({
            'email': 'test@testnotunique.com',
            'password': '4321QWERTYaaaaa',
        })
        self.assertEqual(status_code, 400)

    def test_mock_if_except_password_validation_error(self):
        with mock.patch('project_alpha.web.models.User.set_password', side_effect=ValidationError('test')):
            status_code, content = self.request({
                'email': 'test@fort.test',
                'password': '4321QWERTYaaaaa',
            })
            self.assertIn('test', content['errors'][0]['message'])
            self.assertEqual(status_code, 400)

class UserPreferencesAPIViewTestCase(APITestCase):

    def setUp(self):
        self.username = 'test@example.com'
        self.pwd = '1234QWERty'
        self.user = User.objects.create_user(self.username, self.pwd)

    def test_happy_path_update_user_preferences(self):
        self.client.force_authenticate(user=self.user)  # pylint: disable=no-member
        response = self.client.patch(reverse('preferences'), data={'show_email': True,
                                                                   'send_emails_with_news': True,
                                                                   'timezone': 'Test/test',
                                                                   'about_user': 'TEST',
                                                                   'send_updates_threads': True,
                                                                   'send_user_reviews': True,
                                                                   'send_user_quests_reviews': True,
                                                                   'send_updates_messages': True,
                                                                   }, format='json')
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertEqual(response.status_code, 200)
        self.assertTrue(usersettings.show_email)
        self.assertTrue(usersettings.send_emails_with_news)
        self.assertEqual(usersettings.timezone, 'Test/test')
        self.assertEqual(usersettings.about_user, 'TEST')
        self.assertTrue(usersettings.send_updates_threads)
        self.assertTrue(usersettings.send_user_reviews)
        self.assertTrue(usersettings.send_user_quests_reviews)
        self.assertTrue(usersettings.send_updates_messages)

    def test_happy_path_get_user_preferences(self):
        self.client.force_authenticate(user=self.user)  # pylint: disable=no-member
        response = self.client.get(reverse('preferences'), format='json')
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertEqual(response.status_code, 200)
        self.assertFalse(usersettings.show_email)
        self.assertFalse(usersettings.send_emails_with_news)
        self.assertEqual(usersettings.timezone, 'UTC')
        self.assertEqual(usersettings.about_user, '')
        self.assertFalse(usersettings.send_updates_threads)
        self.assertFalse(usersettings.send_user_reviews)
        self.assertFalse(usersettings.send_user_quests_reviews)
        self.assertFalse(usersettings.send_updates_messages)
