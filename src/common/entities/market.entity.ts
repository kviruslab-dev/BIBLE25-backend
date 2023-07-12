import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('market')
export class Market {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;

  @Column({
    nullable: false,
    length: 30,
    default: '',
    comment: '제목',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
    comment: 'country:KR',
  })
  country: string;

  @Column({
    nullable: false,
    default: '',
    comment: '서울',
  })
  timezone: string;

  @Column({
    nullable: false,
    default: '',
    comment: 'Gangseo-gu',
  })
  city: string;
  @Column({
    nullable: false,
    default: 0,
    comment: '화면에서 어떤 위치에 있는가?',
  })
  location: number;

  @Column({
    nullable: false,
    default: 0,
    comment: '화면페이지',
  })
  page: number;

  @Column({
    nullable: false,
    default: 0,
    comment: '광고클릭수',
  })
  tick: number;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지링크',
  })
  image: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지클릭시링크이동',
  })
  link: string;

  @Column({
    nullable: false,
    length: 30,
    default: '',
    comment: '시작일',
  })
  start_date: string;

  @Column({
    nullable: false,
    length: 30,
    default: '',
    comment: '종료일',
  })
  end_date: string;

  @Column({
    nullable: false,
    default: 0,
    comment: '광고가 실행되는지 아닌지',
  })
  showyn: number;

  @Column({
    nullable: false,
    length: 30,
    default: '',
    comment: '광고올린사람',
  })
  admin: string;

  @Column({
    nullable: false,
    length: 200,
    default: '',
    comment: '운영자 노트 기입',
  })
  note: string;

  @Column({
    nullable: false,
    default: 0,
    comment: '실제내려가는데이터',
  })
  active: number;
}

@Entity('iplocal')
export class IPLocal {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    default: '',
    comment: 'country:KR',
  })
  country: string;
  @Column({
    nullable: false,
    default: '',
    comment: 'Gangseo-gu',
  })
  city: string;
  @Column({
    nullable: false,
    default: '',
    comment: '서울',
  })
  timezone: string;

  @Column({
    nullable: false,
    default: '',
    comment: '위도',
  })
  latitude: string;

  @Column({
    nullable: false,
    default: '',
    comment: '경도',
  })
  longitude: string;
}

@Entity('market_item')
export class MarketItem {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    default: 0,
    comment: '상품구분, 1, 2',
  })
  gubun: number;
  @Column({
    nullable: false,
    default: 0,
    comment: '광고클릭수',
  })
  tick: number;

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
    comment: '가격',
  })
  money: number;

  @Column({
    nullable: false,
    length: 10,
    default: '5.0',
    comment: '평점',
  })
  star: string;

  @Column({
    nullable: false,
    default: 15,
    comment: '할인',
  })
  dc: number;

  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지링크',
  })
  image: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지클릭시링크이동',
  })
  link: string;
  @Column({
    nullable: false,
    default: false,
    comment: '광고가 실행되는지 아닌지',
  })
  showyn: boolean;

  @Column({
    nullable: false,
    length: 30,
    default: '',
    comment: '광고올린사람',
  })
  admin: string;

  @Column({
    nullable: false,
    length: 200,
    default: '',
    comment: '운영자 노트 기입',
  })
  note: string;

  @Column({
    nullable: false,
    default: 0,
    comment: '광고 순서',
  })
  sequence: number;

  @Column({
    nullable: false,
    default: 0,
    comment: '실제내려가는데이터',
  })
  active: number;
}

@Entity('market_page')
export class MarketPage {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    default: 0,
    comment: '메인1, 첫화면2..',
  })
  page: number;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이름',
  })
  name: string;
}
