from random import choice, randint

ANIMALS = ('Crow', 'Peacock', 'Dove', 'Sparrow', 'Goose', 'Stork', 'Pigeon', 'Turkey', 'Hawk', 'Raven',
           'Parrot', 'Flamingo', 'Seagull', 'Ostrich', 'Swallow', 'Penguin', 'Robin', 'Swan', 'Owl',
           'Camel', 'Starfish', 'Koala', 'Alligator', 'Owl', 'Tiger', 'Bear', 'Coyote', 'Chimpanzee', 'Raccoon',
           'Lion', 'Crocodile', 'Dolphin', 'Elephant', 'Squirrel', 'Snake', 'Kangaroo', 'Elk', 'Fox',
           'Gorilla', 'Bat', 'Hare', 'Toad', 'Frog', 'Deer', 'Rat', 'Badger', 'Lizard', 'Mole', 'Otter', 'Reindeer')
ADJECTIVES = ('amazed', 'beautiful', 'bold', 'brave', 'cheerful', 'delightful', 'excited', 'festive', 'free', 'jolly',
              'optimistic', 'proud', 'wonderful', 'awestruck', 'bashful', 'cautious', 'composed', 'easygoing',
              'horrified', 'intelligent', 'mysterious', 'quizzical', 'secretive', 'secular', 'shy')


def generate_unique_nickname(model, max_lengh=25) -> str:
    adjective = choice(ADJECTIVES).title()
    animal = choice(ANIMALS).title()
    number = randint(1, 999)
    nickname = f'{adjective}{animal}{number}'

    nickname_exists = model.objects.filter(nickname=nickname).exists()
    if nickname_exists or len(nickname) > max_lengh:
        generate_unique_nickname(model)

    return nickname
