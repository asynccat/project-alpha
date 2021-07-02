from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _
from django.conf import settings

from PIL import Image


class ValidateUsersAvatar:
    limit_mb = settings.UPLOAD_IMAGE_MAX_SIZE_MB
    allowed_image_formats = settings.ALLOWED_IMAGE_FORMATS

    def validate_image_size(self, image):
        """
        Checks for image size not more than we need
        """
        file_size = image.size
        if file_size > self.limit_mb * 1024 * 1024:
            raise ValidationError(_("Max size of file is %(limit_mb)d MB"),
                                  code='mage_is_too_large',
                                  params={'limit_mb': self.limit_mb},
                                  )

    def validate_image_format(self, image):
        """
        Checks for image size not more than we need
        """
        user_avatar = Image.open(image)
        if user_avatar.format not in self.allowed_image_formats:
            raise ValidationError(_("Invalid file format. Allowed image formats: %(allowed_image_formats)s"),
                                  code='invalid_file_format',
                                  params={'allowed_image_formats': ', '.join(self.allowed_image_formats)}
                                  )

    def validate(self, image):
        """
        Checks image is not valid
        """
        validators = [self.validate_image_size, self.validate_image_format]
        errors = []
        for validator in validators:
            try:
                validator(image)
            except ValidationError as error:
                errors.append(error)
        if errors:
            raise ValidationError(errors)
