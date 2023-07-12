import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Deluxe, JangJul } from './entity/deluxe.entity';

// 01. 매튜핸리
@Entity('deluxe_matt')
export class DelMatt extends JangJul {}

@Entity('deluxe_matt_new')
export class DelMattNew extends Deluxe {}

// 02. 뱅겔신약
@Entity('deluxe_ben')
export class DelBen extends Deluxe {}

// 03. 내촌감삼
@Entity('deluxe_nadb')
export class DelNadb extends Deluxe {}

// 04. 캐논사복음
@Entity('deluxe_cannon')
export class DelCannon extends Deluxe {
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc1: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc2: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc3: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc4: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc5: string;
}

// 05. 랑게
@Entity('deluxe_range')
export class DelRange extends Deluxe {}

// 06. 풀핏
@Entity('deluxe_pulpit')
export class DelPulpit extends Deluxe {}

// 07. 에메트 신학주해
@Entity('deluxe_emet')
export class DelEmet extends Deluxe {}

// 08. 장별 요약
@Entity('deluxe_jang')
export class DelJang extends Deluxe {
  @Column('longtext', { nullable: false, default: '', comment: '추가내용1' })
  etc: string;
}

// 09. 절기 예식
@Entity('deluxe_season')
export class DelSeason extends Deluxe {}

// 10. 마이어
@Entity('deluxe_meyer')
export class DelMeyer extends Deluxe {
  @Column({ nullable: false, default: '', comment: '추가내용1-창 1:1-5' })
  etc: string;
}

// 11. 미전풍
@Entity('deluxe_mipung')
export class DelMipung extends Deluxe {
  @Column({ nullable: false, default: '', comment: '추가내용1 창 1' })
  etc: string;
}

// 12. 신구약총론
@Entity('deluxe_chong')
export class DelChong extends Deluxe {}

// 13. 월밍턴성경연구
@Entity('deluxe_wil')
export class DelWil extends Deluxe {}

// 14. 그레이스 말씀동산
@Entity('deluxe_grace')
export class DelGrace extends Deluxe {
  @Column('longtext', { nullable: false, default: '', comment: '기도문' })
  kido: string;
  @Column('longtext', { nullable: false, default: '', comment: '세계사' })
  history: string;
}

// 15. 7단계 성경연구
@Entity('deluxe_seven')
export class DelSeven extends Deluxe {
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc1: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc2: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc3: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  etc4: string;
  @Column({ nullable: false, default: '', comment: '상세성경' })
  detailbook: string;
}

//study
//bible_jusuk
@Entity('bible_stu')
export class BibStu extends JangJul {}

//bible_note
//성경-핵심
@Entity('bible_note')
export class BibNote extends JangJul {}

//성경-묵상
//bible_sul
@Entity('bible_muk')
export class BibMuk extends JangJul {}

//bible_qna
//성경- qna
@Entity('bible_qna')
export class BibQna extends JangJul {}

//bible_img
//성경- 포토
@Entity('bible_pho')
export class BibPho extends JangJul {
  @Column({ nullable: false, default: 0, comment: 'end book' })
  ebook: number;
  @Column({ nullable: false, default: 0, comment: 'end jang' })
  ejang: number;
  @Column({ nullable: false, default: 0, comment: 'end jul' })
  ejul: number;
  @Column({ nullable: false, length: 100, default: '', comment: '이미지' })
  image: string;
}

//deluxe_bo_bibled2
//성경사전
@Entity('bible_dic')
export class BibDic extends Deluxe {}

//select * from sys.g4_board_file  where bo_table = 'bible_map' order by wr_id
//select * from sys.g4_write_bible_map   order by wr_id LIMIT 10
@Entity('bible_map')
export class BibMap extends Deluxe {
  @Column({ nullable: false, length: 20, default: '', comment: '평면도' }) //wr_2
  etc: string;
  @Column({ nullable: false, default: 0, comment: '이미지인덱스' }) //wr_parent
  imgidx: number;
}

//g4_write_photo_bible_dic2
//select * from sys.g4_board_file  where bo_table = 'photo_bible_dic2' order by wr_id
//성경포토사진
@Entity('bible_photodic')
export class BibPhodic extends Deluxe {
  @Column({ nullable: false, length: 300, default: '', comment: '추가내용' })
  etc: string;
  @Column({ nullable: false, default: 0, comment: '이미지인덱스' }) //wr_parent
  imgidx: number;
}

//g4_board_file
//이미지 테이블
@Entity('img_info')
export class ImgInfo {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({ nullable: false, default: 0, comment: '이미지인덱스' }) //wr_id
  imgidx: number;
  @Column({
    nullable: false,

    default: 0,
    comment: '이미지2개구분',
  }) //bf_no
  num: number;
  @Column({
    nullable: false,
    length: 20,
    default: '',
    comment: '이미지구분 photo_bible_dic2 bible_map',
  }) //bo_table
  image_gubun: string;
  @Column({ nullable: false, length: 100, default: '', comment: '제목' }) //bf_source
  title: string;
  @Column({ nullable: false, length: 300, default: '', comment: '경로' }) //bf_file
  image: string;
  @Column({ nullable: false, default: 0, comment: '크기' }) //bf_size
  imgsize: number;
  @Column({ nullable: false, default: 0, comment: '가로' }) //bf_width
  width: number;
  @Column({ nullable: false, default: 0, comment: '높이' }) //bf_height
  height: number;
  @Column({ nullable: false, default: 0, comment: '타입' }) //bf_type
  flag: number;
}

@Entity('today_image')
export class ToDayImage {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    default: 0,
    comment: '이미지구분, 1십자가, 2손편지',
  })
  gubun: number;
  @Column({
    nullable: false,
    length: 20,
    default: '',
    comment: '2023-05-30',
  })
  today: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '제목',
  })
  title: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지',
  })
  image: string;
  @Column({
    nullable: false,
    default: 0,
    comment: '실제내려가는데이터',
  })
  active: number;
}

@Entity('today_content')
export class ToDayContent {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    default: 1,
    comment: '말씀따라인데 형식이 다른 모양이 있음 1, 2, 3',
  })
  frame: number;
  @Column({
    nullable: false,
    length: 20,
    default: '',
    comment: '2023-05-30',
  })
  today: string;
  @Column({
    nullable: false,
    default: 0,
    comment:
      '이미지구분, 1말씀따라, 5톨레레게(성경통독), 2굿모닝하나님, 4컬럼 3축복기도(오늘의말씀) 6오늘의책',
  })
  gubun: number;
  @Column({ nullable: false, length: 20, default: '', comment: '송병구목사' })
  writer: string;
  @Column({
    nullable: false,
    length: 50,
    default: '',
    comment: '말씀따라,굿모닝하나님',
  })
  name: string;
  @Column({ nullable: false, length: 200, default: '', comment: '제목' })
  title: string;
  @Column({
    nullable: false,
    length: 500,
    default: '',
    comment: '요절/초대/오늘의책:부제목',
  })
  yojul: string;
  @Column({ nullable: false, length: 300, default: '', comment: '찬송' })
  song: string;
  @Column({
    nullable: false,
    length: 1000,
    default: '',
    comment: '성경/축복기도',
  })
  bible: string;
  @Column({ nullable: false, length: 2000, default: '', comment: '성찰/묵상' })
  sungchal: string;
  @Column({
    nullable: false,
    length: 2000,
    default: '',
    comment: '기도/일용할기도',
  })
  kido: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;

  @Column({ nullable: false, length: 1200, default: '', comment: '이미지경로' })
  image: string;

  @Column({
    nullable: false,
    default: 0,
    comment: '실제내려가는데이터',
  })
  active: number;
}

@Entity('today_image_his')
export class ToDayImageHis {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;

  @Column({
    nullable: false,
    length: 20,
    default: '',
    comment: '5월 30일',
  })
  today: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '제목',
  })
  title: string;

  @Column({
    nullable: false,
    default: 0,
    comment: '이미지구분, 1십자가, 2책, 3손편지',
  })
  gubun: number;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지인덱스',
  }) //wr_id
  image: string;
}

@Entity('today_content_his')
export class ToDayContentHis {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    length: 20,
    default: '',
    comment: '5월 30일',
  })
  today: string;
  @Column({
    nullable: false,
    default: 0,
    comment: '이미지구분, 1말씀따라, 2톨레레게, 3굿모닝하나님',
  })
  gubun: number;

  @Column({ nullable: false, length: 20, default: '', comment: '송병구목사' })
  writer: string;
  @Column({ nullable: false, length: 100, default: '', comment: '제목' })
  title: string;
  @Column({ nullable: false, length: 200, default: '', comment: '요절/초대' })
  yojul: string;
  @Column({ nullable: false, length: 50, default: '', comment: '찬송' })
  song: string;
  @Column({ nullable: false, length: 1000, default: '', comment: '성경' })
  bible: string;
  @Column({ nullable: false, length: 1000, default: '', comment: '성찰/묵상' })
  sungchal: string;
  @Column({
    nullable: false,
    length: 1000,
    default: '',
    comment: '기도/일용할기도',
  })
  kido: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
}
