export const CHANSONG_URL = 'https://ch2ho.bible25.co.kr/kviruslab/chansong/';

export const KAKAO_URL =
  'https://dapi.kakao.com/v2/local/geo/coord2address.json';

export const BIBLE_AUDIO_URL =
  'https://ch2ho.bible25.co.kr/kviruslab/bible/audio_ver02/';

export const BIBLE_PHOTO_URL =
  'https://ch2ho.bible25.co.kr/kviruslab/intellectual/biblephoto/';

export const BIBLE_MAP_URL =
  'https://ch2ho.bible25.co.kr/kviruslab/intellectual/biblemap/';

export const BIBLE_PHOTODIC_URL =
  'https://ch2ho.bible25.co.kr/kviruslab/intellectual/bibledic/';

export const ONE_ADVERTISEMENT = [
  'first',
  'last',
  'bible',
  'chansong',
  'malsum',
  'good',
  'today',
  'kido',
  'calum',
  'cross',
  'letter',
  'book',
  'ildok',
  'dic',
  'biblemap',
  'photodic',
  'study',
  'note',
  'muksnag',
  'qna',
  'photo',
];

export const TODAY_CONTENTS = [
  '',
  'malsum',
  'good',
  'kido',
  'calum',
  'today',
  'book',
  'cross',
  'letter',
];

export const TODAY_LISTS = [
  '',
  'malsumlist',
  'goodlist',
  'kidolist',
  'calumlist',
  'todaylist',
  'booklist',
  'crosslist',
  'letterlist',
];

export const TODAY_SELECT_CONDITION = [
  [],
  [
    `id`,
    `today`,
    `content`,
    `title`,
    'yojul',
    'song',
    'sungchal',
    'kido',
    'bible',
  ],
  [
    `id`,
    `today`,
    `content`,
    `title`,
    `writer`,
    'yojul as chodae',
    'sungchal as muksang',
    'kido',
    'bible',
    'song',
  ],
  [`id`, `today`, `content`, `title`, `writer`, 'yojul as slogan ', 'bible'],
  [`id`, `today`, `content`, `title`, `writer`],
  [
    `id`,
    `today`,
    `content`,
    `writer`,
    `title`,
    'yojul as middle',
    'song as bible',
    'bible as start',
  ],
  [`id`, `today`, `content`, `title`, `writer`],
  [`id`, `today`, `image`, `title`],
  [`id`, `today`, `image`, `title`],
];
