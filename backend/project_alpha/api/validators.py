from rest_framework import serializers

from project_alpha.web.utils.nickname_validator import is_valid_length, is_valid_symbols, nickname_in_blacklist


class NicknameValidator:

    def __call__(self, value):
        validators = [is_valid_length, is_valid_symbols, nickname_in_blacklist]
        errors = []

        for validator in validators:
            valid = validator(value)
            if valid is not True:
                errors.append(valid)

        if errors:
            raise serializers.ValidationError(errors)
