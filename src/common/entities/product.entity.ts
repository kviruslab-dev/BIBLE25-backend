import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
    length: 200,
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
