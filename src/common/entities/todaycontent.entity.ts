import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
