import { Column, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

export class Deluxe {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({ nullable: false, default: 0, comment: 'book' })
  book: number;
  @Column({ nullable: false, default: '', comment: 'sort' })
  code: string;
  @Column({ nullable: false, length: 100, default: '', comment: '제목' })
  title: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
  @Column('longtext', { nullable: false, default: '', comment: '추가내용' })
  detail: string;
}

export class JangJul {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({ nullable: false, default: 0, comment: 'book' })
  book: number;
  @Column({ nullable: false, default: 0, comment: 'jang' })
  jang: number;
  @Column({ nullable: false, default: 0, comment: 'jul' })
  jul: number;
  @Column({ nullable: false, default: 0, comment: 'flag' })
  flag: number;
  // @Column({ nullable: false, default: '', comment: 'sort' })
  // code: string;
  @Column({ nullable: false, length: 40, default: '', comment: '' })
  bible: string;
  @Column({ nullable: false, length: 100, default: '', comment: '제목' })
  title: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
}
