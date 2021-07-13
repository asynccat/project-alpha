import shutil
import json
import tempfile
from unittest import mock

from PIL import Image

from django.urls import reverse
from django.conf import settings
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
    # pylint: disable=no-member

    def setUp(self):
        self.username = 'test@example.com'
        self.pwd = '1234QWERty'
        self.user = User.objects.create_user(self.username, self.pwd)

    def test_happy_path_update_all_user_preferences(self):
        self.client.force_authenticate(user=self.user)
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

        self.assertTrue(usersettings.show_email)
        self.assertTrue(usersettings.send_emails_with_news)
        self.assertEqual(usersettings.timezone, 'Test/test')
        self.assertEqual(usersettings.about_user, 'TEST')
        self.assertTrue(usersettings.send_updates_threads)
        self.assertTrue(usersettings.send_user_reviews)
        self.assertTrue(usersettings.send_user_quests_reviews)
        self.assertTrue(usersettings.send_updates_messages)
        self.assertEqual(response.status_code, 200)

    def test_happy_path_update_not_all_user_preferences(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(reverse('preferences'), data={'show_email': True,
                                                                   'send_emails_with_news': True,
                                                                   'timezone': 'Test/test',
                                                                   'about_user': 'TEST',
                                                                   }, format='json')
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertTrue(usersettings.show_email)
        self.assertTrue(usersettings.send_emails_with_news)
        self.assertEqual(usersettings.timezone, 'Test/test')
        self.assertEqual(usersettings.about_user, 'TEST')
        self.assertEqual(response.status_code, 200)

    def test_happy_path_get_user_preferences(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.get(reverse('preferences'), format='json')
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertEqual(usersettings.show_email, response.data['show_email'])
        self.assertEqual(usersettings.send_emails_with_news, response.data['send_emails_with_news'])
        self.assertEqual(usersettings.timezone, response.data['timezone'])
        self.assertEqual(usersettings.about_user, response.data['about_user'])
        self.assertEqual(usersettings.send_updates_threads, response.data['send_updates_threads'])
        self.assertEqual(usersettings.send_user_reviews, response.data['send_user_reviews'])
        self.assertEqual(usersettings.send_user_quests_reviews, response.data['send_user_quests_reviews'])
        self.assertEqual(usersettings.send_updates_messages, response.data['send_updates_messages'])
        self.assertEqual(response.status_code, 200)

    def test_request_data_does_not_match_type(self):
        self.client.force_authenticate(user=self.user)

        default_usersettings = {'show_email': False,
                                     'send_emails_with_news': False,
                                     'timezone': 'UTC',
                                     'about_user': '',
                                     'send_updates_threads': False,
                                     'send_user_reviews': False,
                                     'send_user_quests_reviews': False,
                                     'send_updates_messages': False,
                                     }

        response = self.client.patch(reverse('preferences'), data={'show_email': 'test',
                                                                   'send_emails_with_news': 'test',
                                                                   'timezone': True,
                                                                   'about_user': 123,
                                                                   'send_updates_threads': 54,
                                                                   'send_user_reviews': 'test',
                                                                   'send_user_quests_reviews': 21,
                                                                   'send_updates_messages': 'test',
                                                                   }, format='json')
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertEqual(usersettings.show_email, default_usersettings['show_email'])
        self.assertFalse(usersettings.send_emails_with_news, default_usersettings['send_emails_with_news'])
        self.assertEqual(usersettings.timezone, default_usersettings['timezone'])
        self.assertEqual(usersettings.about_user, default_usersettings['about_user'])
        self.assertEqual(usersettings.send_updates_threads,  default_usersettings['send_updates_threads'])
        self.assertEqual(usersettings.send_user_reviews, default_usersettings['send_user_reviews'])
        self.assertEqual(usersettings.send_user_quests_reviews, default_usersettings['send_user_quests_reviews'])
        self.assertEqual(usersettings.send_updates_messages, default_usersettings['send_updates_messages'])
        self.assertEqual(response.status_code, 400)

    def test_request_blank_field_in_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(reverse('preferences'), data={'timezone': ''}, format='json')
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertNotEqual(usersettings.timezone, '')
        self.assertEqual(response.status_code, 400)

    def test_request_empty_data(self):
        self.client.force_authenticate(user=self.user)
        response = self.client.patch(reverse('preferences'), data={}, format='json')

        self.assertEqual(response.status_code, 200)

class UpdateEmailAPIViewTestCase(APITestCase):

    def setUp(self):
        self.username = 'test@example.com'
        self.pwd = '1234QWERty'
        self.user = User.objects.create_user(self.username, self.pwd)

        self.second_username = 'notunique@test.com'
        self.second_pwd = 'Test1234567'
        self.second_user = User.objects.create_user(self.second_username, self.second_pwd)

    def request(self, data):
        self.client.force_authenticate(user=self.user)  # pylint: disable=no-member
        response = self.client.post(reverse('change_email'), data=data, format='json')
        return response.status_code, json.loads(response.content)

    def test_success_change_email(self):
        status_code, _ = self.request({
            'email': 'email@change.com',
            'confirm_password': self.pwd,
        })

        self.assertEqual(self.user.email, 'email@change.com')
        self.assertEqual(status_code, 200)

    def test_unsuccess_change_email_invalid_password(self):
        status_code, content = self.request({
            'email': 'email@newchange.com',
            'confirm_password': 'TstTest12345',
        })

        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(content['errors'][0]['message'][0], 'Invalid password')
        self.assertEqual(status_code, 400)

    def test_unsuccess_change_email_data_is_not_email(self):
        status_code, content = self.request({
            'email': 'emailnew',
            'confirm_password': self.pwd,
        })

        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(content['errors'][0]['message'][0], 'Enter a valid email address.')
        self.assertEqual(status_code, 400)

    def test_unsuccess_change_email_is_not_unique(self):
        status_code, content = self.request({
            'email': self.second_username,
            'confirm_password': self.pwd,
        })

        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(content['errors'][0]['message'][0], 'Email already exists')
        self.assertEqual(status_code, 400)

class UploadUserAvatarAPIViewTestCase(APITestCase):

    def setUp(self):
        self.username = 'test@example.com'
        self.pwd = '1234QWERty'
        self.user = User.objects.create_user(self.username, self.pwd)

    def request(self, data):
        self.client.force_authenticate(user=self.user)  # pylint: disable=no-member
        response = self.client.post(reverse('profile_image'), data=data, format='multipart')
        return response.status_code, json.loads(response.content)

    def create_image(self, schema, size, suffix):
        image = Image.new(schema, size=size)
        file = tempfile.NamedTemporaryFile(suffix=suffix)
        image.save(file)
        return file

    def test_success_upload_image(self):
        image = self.create_image(schema='RGB', size=(1, 1), suffix='.jpg')
        with open(image.name, 'rb') as user_avatar:
            status_code, _ = self.request({'avatar': user_avatar})
        usersettings = UserSettings.objects.get(user=self.user)

        self.assertEqual(settings.MEDIA_URL + str(usersettings.avatar), usersettings.avatar.url)
        self.assertEqual(status_code, 200)

    def test_upload_image_format_not_allowed(self):
        image = self.create_image(schema='RGB', size=(1, 1), suffix='.gif')
        with open(image.name, 'rb') as user_avatar:
            status_code, content = self.request({'avatar': user_avatar})
        error_message = 'Invalid file format. Allowed image formats: JPG, PNG, JPEG'

        self.assertEqual(content['errors'][0]['message'][0], error_message)
        self.assertEqual(status_code, 400)

    def test_upload_image_size_too_big(self):
        image = self.create_image(schema='CMYK', size=(7000, 7000), suffix='.jpg')
        with open(image.name, 'rb') as user_avatar:
            status_code, content = self.request({'avatar': user_avatar})

        self.assertEqual(content['errors'][0]['message'][0], 'Max size of file is 2 MB')
        self.assertEqual(status_code, 400)

    @classmethod
    def tearDownClass(cls):
        shutil.rmtree(settings.MEDIA_URL)
