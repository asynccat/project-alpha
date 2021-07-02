def generate_avatar_folder_name(self, filename):
    path = "users_profile_images/%s/%s" % (self.user.nickname, filename)
    return path
