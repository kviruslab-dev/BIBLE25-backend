export const CHANSONG_URL = 'https://data.bible25.com/chansong/';

export const KAKAO_URL =
  'https://dapi.kakao.com/v2/local/geo/coord2address.json';

export const BIBLE_AUDIO_URL = 'https://data.bible25.com/bible/audio/';

export const BIBLE_PHOTO_URL = 'https://data.bible25.com/bible/biblephoto/';

export const BIBLE_MAP_URL = 'https://data.bible25.com/bible/biblemap/';

export const BIBLE_PHOTODIC_URL = 'https://data.bible25.com/bible/bibledic/';

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

export const SEARCH_CONTENTS = [
  '',
  'bible',
  'dic',
  'photodic',
  'biblemap',
  'jusuk',
  'kanghae',
];

/**
 * main: 1(메인)
 * bible: 4(성경), 305(스터디), 306(핵심), 307(묵상), 308(QA), 309(포토)
 * hymm: 5(찬송)
 * lab(성경사전): 304(포토성경사전), 303(성서지도), 302(성서사전)
 * todays(투데이광고): 201, 202, 203, 204, 205, 206, 207, 208
 * product: [[market_item]]
 * donate: [[board]]
 * etc(기타 광고): 2(첫화면), 3(마지막종료), 301(성경일독)
 */

export const ADMIN_TYPE_OBJECT = {
  main: [1],
  bible: [4, 305, 306, 307, 308, 309],
  hymm: [5],
  lab: [302, 303, 304],
  todays: [201, 202, 203, 204, 205, 206, 207, 208],
  product: [],
  donate: [],
  etc: [2, 3, 301],
};
