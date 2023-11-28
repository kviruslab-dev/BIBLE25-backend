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

  @Column({
    nullable: false,
    default: 10,
    comment: '가중치',
  })
  rate: number;
}
