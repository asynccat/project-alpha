# Generated by Django 3.1.7 on 2021-06-22 16:46

from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=150, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('nickname', models.CharField(blank=True, max_length=25, null=True, unique=True, verbose_name='nickname')),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions')),
            ],
        ),
        migrations.CreateModel(
            name='UserSettings',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, serialize=False, to='web.user')),
                ('avatar', models.FilePathField(blank=True, null=True, verbose_name='avatar')),
                ('nickname_updated', models.DateTimeField(blank=True, null=True, verbose_name='nickname_updated')),
                ('show_email', models.BooleanField(default=False, verbose_name='show_email')),
                ('send_emails_with_news', models.BooleanField(default=False, verbose_name='send_emails_with_news')),
                ('timezone', models.CharField(default='UTC', max_length=50, verbose_name='timezone')),
                ('about_user', models.CharField(blank=True, default='', max_length=500, verbose_name='about_user')),
                ('send_updates_threads', models.BooleanField(default=False, verbose_name='send_updates_threads')),
                ('send_user_reviews', models.BooleanField(default=False, verbose_name='send_user_reviews')),
                ('send_user_quests_reviews', models.BooleanField(default=False, verbose_name='send_user_quests_reviews')),
                ('send_updates_messages', models.BooleanField(default=False, verbose_name='send_updates_messages')),
            ],
        ),
    ]
