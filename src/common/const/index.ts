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
  '첫화면',
  '마지막종료',
  '성경',
  '찬송',
  '말씀따라',
  '굿모닝하나님',
  '오늘의말씀',
  '축복기도',
  '칼럼',
  '십자가',
  '손편지',
  '오늘의책',
  '성경일독',
  '성경사전',
  '성서지도',
  '포토성경사전',
  '스터디',
  '핵심',
  '묵상',
  'QA',
  '포토',
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
