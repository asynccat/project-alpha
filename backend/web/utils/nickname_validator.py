import string
from django.utils.translation import ugettext_lazy as _

VALID_SYMBOLS = ['_']
BLACKLIST = ['2g1c', '2_girls_1_cup', 'acrotomophilia', 'alabama_hot_pocket', 'alaskan_pipeline', 'anal', 'anilingus',
             'anus', 'apeshit', 'arsehole', 'asshole', 'assmunch', 'auto_erotic', 'autoerotic', 'babeland',
             'baby_batter', 'baby_juice', 'ball_gag', 'ball_gravy', 'ball_kicking', 'ball_licking', 'ball_sack',
             'ball_sucking', 'bangbros', 'bangbus', 'bareback', 'barely_legal', 'barenaked', 'bastard', 'bastardo',
             'bastinado', 'bdsm', 'beaner', 'beaners', 'beaver_cleaver', 'beaver_lips', 'beastiality', 'bestiality',
             'big_black', 'big_breasts', 'big_knockers', 'big_tits', 'bimbos', 'birdlock', 'bitch', 'bitches',
             'black_cock', 'blonde_action', 'blonde_on_blonde_action', 'blowjob', 'blow_job', 'blow_your_load',
             'blue_waffle', 'blumpkin', 'bollocks', 'bondage', 'boner', 'boob', 'boobs', 'booty_call', 'brown_showers',
             'brunette_action', 'bukkake', 'bulldyke', 'dick', 'female_squirting', 'hooker', 'intercourse',
             'bullet_vibe', 'bullshit', 'bung_hole', 'bunghole', 'busty', 'butt', 'buttcheeks', 'butthole', 'camel_toe',
             'camgirl', 'camslut', 'camwhore', 'carpet_muncher', 'carpetmuncher', 'chocolate_rosebuds', 'cialis',
             'circlejerk', 'cleveland_steamer', 'clit', 'clitoris', 'clover_clamps', 'clusterfuck', 'cock', 'cocks',
             'coprolagnia', 'coprophilia', 'cornhole', 'coon', 'coons', 'creampie', 'cumming', 'cumshot', 'cumshots',
             'cunnilingus', 'cunt', 'darkie', 'date_rape', 'daterape', 'deep_throat', 'deepthroat', 'dendrophilia',
             'dildo', 'dingleberry', 'dingleberries', 'dirty_pillows', 'dirty_sanchez', 'doggie_style', 'doggiestyle',
             'doggy_style', 'doggystyle', 'dog_style', 'dolcett', 'domination', 'dominatrix', 'dommes', 'donkey_punch',
             'double_dong', 'double_penetration', 'dp_action', 'dry_hump', 'dvda', 'eat_my_ass', 'ecchi', 'ejaculation',
             'erotic', 'erotism', 'escort', 'eunuch', 'faggot', 'fecal', 'felch', 'fellatio', 'feltch', 'nig_nog',
             'femdom', 'figging', 'fingerbang', 'fingering', 'fisting', 'foot_fetish', 'footjob', 'frotting', 'fuck',
             'fuck_buttons', 'fuckin', 'fucking', 'fucktards', 'fudge_packer', 'fudgepacker', 'futanari', 'gangbang',
             'gang_bang', 'gay_sex', 'genitals', 'giant_cock', 'girl_on', 'girl_on_top', 'girls_gone_wild', 'goatcx',
             'goatse', 'god_damn', 'gokkun', 'golden_shower', 'goodpoop', 'goo_girl', 'goregasm', 'grope', 'group_sex',
             'g-spot', 'guro', 'hand_job', 'handjob', 'hard_core', 'hardcore', 'hentai', 'homoerotic', 'honkey',
             'horny', 'hot_carl', 'hot_chick', 'how_to_kill', 'how_to_murder', 'huge_fat', 'humping', 'incest',
             'jack_off', 'jail_bait', 'jailbait', 'jelly_donut', 'jerk_off', 'jigaboo', 'jiggaboo', 'jiggerboo', 'jizz',
             'juggs', 'kike', 'kinbaku', 'kinkster', 'kinky', 'knobbing', 'leather_restraint', 'sexually', 'tub_girl',
             'leather_straight_jacket', 'masturbating', 'nymphomania', 'rusty_trombone', 'tight_white', 'urethra_play',
             'lemon_party', 'livesex', 'lolita', 'lovemaking', 'make_me_come', 'male_squirting', 'masturbate',
             'masturbation', 'menage_a_trois', 'milf', 'missionary_position', 'mong', 'motherfucker', 'mound_of_venus',
             'mr_hands', 'muff_diver', 'muffdiving', 'nambla', 'nawashi', 'negro', 'neonazi', 'nigga', 'nigger',
             'nimphomania', 'nipple', 'nipples', 'nsfw', 'nsfw_images', 'nude', 'nudity', 'nutten', 'nympho',
             'octopussy', 'omorashi', 'one_cup_two_girls', 'one_guy_one_jar', 'orgasm', 'orgy', 'paedophile', 'paki',
             'panties', 'panty', 'pedobear', 'pedophile', 'pegging', 'penis', 'phone_sex', 'piece_of_shit', 'pikey',
             'pissing', 'piss_pig', 'pisspig', 'playboy', 'pleasure_chest', 'pole_smoker', 'ponyplay', 'poof', 'poon',
             'poontang', 'punany', 'poop_chute', 'poopchute', 'porn', 'porno', 'pornography', 'prince_albert_piercing',
             'pthc', 'pubes', 'pussy', 'queaf', 'queef', 'quim', 'raghead', 'raging_boner', 'rape', 'raping', 'rapist',
             'rectum', 'reverse_cowgirl', 'rimjob', 'rimming', 'rosy_palm', 'rosy_palm_and_her_5_sisters',
             'sadism', 'santorum', 'scat', 'schlong', 'scissoring', 'semen', 'sexcam', 'sexo', 'sexy', 'sexual',
             'sexuality', 'shaved_beaver', 'shaved_pussy', 'shemale', 'shibari', 'shit', 'shitblimp', 'shitty', 'shota',
             'shrimping', 'skeet', 'slanteye', 'slut', 'smut', 'snatch', 'snowballing', 'sodomize', 'sodomy', 'spastic',
             'spic', 'splooge', 'splooge_moose', 'spooge', 'spread_legs', 'spunk', 'strap_on', 'strapon', 'strappado',
             'strip_club', 'style_doggy', 'suck', 'sucks', 'suicide_girls', 'sultry_women', 'swastika', 'swinger',
             'tainted_love', 'taste_my', 'tea_bagging', 'threesome', 'throating', 'thumbzilla', 'tied_up', 'voyeurweb',
             'tits', 'titties', 'titty', 'tongue_in_a', 'topless', 'tosser', 'towelhead', 'tranny', 'tribadism',
             'tubgirl', 'tushy', 'twat', 'twink', 'twinkie', 'two_girls_one_cup', 'undressing', 'upskirt', 'otmudohat',
             'urophilia', 'vagina', 'venus_mound', 'viagra', 'vibrator', 'violet_wand', 'vorarephilia', 'voyeur',
             'voyuer', 'vulva', 'wank', 'wetback', 'wet_dream', 'white_power', 'whore', 'worldsex', 'wrapping_men',
             'wrinkled_starfish', 'yaoi', 'yellow_showers', 'yiffy', 'zoophilia', 'bychara', 'chernozhopyi', 'dolboyeb',
             'ebalnik', 'ebalo', 'ebalom_schelkat', 'mudack', 'opizdenet', 'ostoeblo', 'ostokhuitelno', 'otebis',
             'otpizdit', 'otsosi', 'padlo', 'pedik', 'perdet', 'petuh', 'pidar_gnoinyj', 'pizda', 'pizdato', 'pizdatyi',
             'pizdet', 'pizdetc', 'pizdoi_nakrytsja', 'pizduk', 'pizdyulina', 'podi_kuevo', 'poeben', 'vyperdysh',
             'poiti_posrat', 'po_khuy', 'poluchit_pizdy', 'pososi_moyu_konfetku', 'prissat', 'proebat', 'razyoba'
             'promudobladsksya_pizdoproebina', 'propezdoloch', 'prosrat', 'raspeezdeyi', 'raspizdatyi', 'razyebuy',
             'sebatsya', 'shalava', 'styervo', 'sukin_syn', 'svodit_posrat', 'svoloch', 'trakhatsya', 'zloebuchy',
             'trimandoblydskiy_pizdoproyob', 'ublyudok', 'uboy', 'uebitsche', 'vafla', 'vafli_lovit', 'v_pizdu',
             'vzdrochennyi', 'yeb_vas', 'zaebat', 'zaebis', 'zalupa', 'zalupat', 'zasranetc', 'zassat', ]


def is_valid_length(nickname, min_length=4, max_length=25):
    nickname_length = len(nickname)
    if nickname_length < min_length or nickname_length > max_length:
        return _('Nickname length must be greater than 4 and less than 25')
    return True


def is_valid_symbols(nickname: str):
    uniq_symbols = set(nickname.lower())
    forbidden_symbols = uniq_symbols.difference(set(string.ascii_lowercase), set(string.digits), VALID_SYMBOLS)
    if len(forbidden_symbols):
        return _("Nickname can only contain letters, numbers and symbol '" + " ".join(VALID_SYMBOLS) + "'")
    return True


def nickname_in_blacklist(nickname):
    if nickname in BLACKLIST:
        return _('Forbidden nickname!')
    return True
