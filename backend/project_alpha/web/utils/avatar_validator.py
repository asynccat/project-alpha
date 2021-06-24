from django.core.exceptions import ValidationError
from django.utils.translation import ugettext as _
from django.conf import settings

from PIL import Image

# pylint: disable=unused-argument

class ImageSizeValidator:
    """
    Checks for image size not more than we need
    """
    limit_mb = settings.UPLOAD_IMAGE_MAX_SIZE_MB

    def __call__(self, image):
        file_size = image.file.size
        if file_size > self.limit_mb * 1024 * 1024:
            raise ValidationError(_("Max size of file is %(limit_mb)d MB"),
                                  code='mage_is_too_large',
                                  params={'limit_mb': self.limit_mb},
                                  )

class ImageFormatValidator:
    """
    Checks for image size not more than we need
    """

    allowed_image_formats = settings.ALLOWED_IMAGE_FORMATS

    def __call__(self, image):
        user_avatar = Image.open(image)
        if user_avatar.format not in self.allowed_image_formats:
            raise ValidationError(_("Invalid file format"),
                                  code='invalid_file_format',
                                  )
