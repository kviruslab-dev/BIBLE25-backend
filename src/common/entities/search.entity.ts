import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('youtube')
export class MarketPage {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이름',
  })
  title: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: 'youtube',
  })
  url: string;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이찬수목사',
  })
  writer: string;
}

@Entity('search_history')
export class SearchHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이름',
  })
  title: string;

  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;

  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: 'youtube',
  })
  url: string;

  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이찬수목사',
  })
  writer: string;
}
