export const CHANSONG_URL = 'https://data.bible25.com/chansong/';

export const KAKAO_URL =
  'https://dapi.kakao.com/v2/local/geo/coord2address.json';

export const BIBLE_AUDIO_URL = 'https://data.bible25.com/bible/audio/';

export const BIBLE_PHOTO_URL = 'https://data.bible25.com/bible/biblephoto/';

export const BIBLE_MAP_URL = 'https://data.bible25.com/bible/biblemap/';

export const BIBLE_PHOTODIC_URL = 'https://data.bible25.com/bible/bibledic/';

export const ONE_ADVERTISEMENT = [
  'first',
  // 'last',
  'bible',
  'chansong',
  'malsum',
  'good',
  'today',
  'kido',
  //! 이야기메시지를 추가합니다.
  'iyagi',
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
  'iyagishare',
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
  //! 이야기메시지를 추가합니다.
  'iyagi',
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
  //! 이야기메시지 리스트를 추가합니다.
  'iyagilist',
];

export const TODAY_GUBUN = {
  malsum: 1,
  good: 2,
  kido: 3,
  calum: 4,
  today: 5,
  book: 6,
  cross: 7,
  letter: 8,
  //! 이야기메시지를 추가합니다.
  iyagi: 3,
};

export const TODAY_SELECT_CONDITION = {
  malsum: [
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
  good: [
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
  kido: [
    `id`,
    `today`,
    `content`,
    `title`,
    `writer`,
    'yojul as slogan ',
    'bible',
  ],
  calum: [`id`, `today`, `content`, `title`, `writer`, 'image', 'song'],
  today: [
    `id`,
    `today`,
    `content`,
    `writer`,
    `title`,
    'yojul as middle',
    'song as bible',
    'bible as start',
  ],
  book: [`id`, `today`, `content`, `title`, `writer`, `image`, 'song'],
  cross: [`id`, `today`, `image`, `title`],
  letter: [`id`, `today`, `image`, `title`],
  iyagi: [`id`, `today`, `title`, `content`],
};

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

export const titleToPage = {
  메인01: 1,
  메인02: 1,
  메인03: 1,
  메인04: 1,
  메인05: 1,
  메인06: 1,
  메인07: 1,
  메인08: 1,
  메인09: 1,
  첫화면: 2,
  마지막화면: 3,
  성경ㅁ0장: 4,
  성경ㅁ1장: 4,
  성경ㅁ2장: 4,
  성경ㅁ3장: 4,
  성경ㅁ4장: 4,
  성경ㅁ5장: 4,
  성경ㅁ6장: 4,
  성경ㅁ7장: 4,
  성경ㅁ8장: 4,
  성경ㅁ9장: 4,
  찬송: 5,
  말씀따라: 201,
  굿모닝하나님: 202,
  오늘의말씀: 203,
  축복기도: 204,
  이야기메시지공유: 204,
  컬럼: 205,
  오늘의책: 208,
  성경일독: 301,
  성경사전: 302,
  성서지도: 303,
  포토성경사전: 304,
  스터디: 305,
  핵심: 306,
  묵상: 307,
  QA: 308,
  포토: 309,
};
