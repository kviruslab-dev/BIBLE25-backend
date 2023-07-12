import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

//성경 이름
//com_bookname_tbl
@Entity('sys_biblename')
export class SysBibName {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: 0, comment: '성경인덱스' })
  book: number;
  @Column({ nullable: false, default: 0, comment: '신구약' })
  gubun: number;
  @Column({ nullable: false, length: 20, default: '', comment: '이름' })
  name: string;
  @Column({ nullable: false, length: 20, default: '', comment: '영문이름' })
  ename: string;
  @Column({ nullable: false, length: 10, default: '', comment: '축약' })
  sname: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
}

//성경 mp 3
//com_mbe_jang
@Entity('sys_bible_mp')
export class SysBibMp {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: 0, comment: '성경' })
  book: number;
  @Column({ nullable: false, default: 0, comment: '장' })
  jang: number;
  @Column({ nullable: false, length: 20, default: '', comment: '이름' })
  name: string;
}

//com_mbe_tbl
@Entity('sys_bible')
export class SysBib {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: true, length: 20, default: '', comment: '이름' })
  name: string;
  @Column({ nullable: true, length: 20, default: '', comment: '영문이름' })
  ename: string;
  @Column({ default: 0, comment: '성경' })
  book: number;
  @Column({ default: 0, comment: '장' })
  jang: number;
  @Column({ default: 0, comment: '절' })
  jul: number;
  @Column({ nullable: true, length: 1000, default: '', comment: 'krv' })
  krv: string;
  @Column({ nullable: true, length: 1500, default: '', comment: 'kuv' })
  kuv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'kjv' })
  kjv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'nasb' })
  nasb: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'niv' })
  niv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'bhs' })
  bhs: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'nksb' })
  nksb: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'nkrv' })
  nkrv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'asv' })
  asv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'rsv' })
  rsv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'rv' })
  rv: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'bbe' })
  bbe: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'douay' })
  douay: string;
  @Column({ nullable: true, length: 1000, default: '', comment: 'ylt' })
  ylt: string;
}

//hymm_category
@Entity('sys_hymm_category')
export class SysHymmCategory {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, length: 100, default: '', comment: '내용' })
  title: string;
}

//hymm-new
@Entity('sys_hymm')
export class SysHymm {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: 0, comment: '카테고리인덱스' })
  cateidx: number;
  @Column({ nullable: false, default: '', comment: '옛날번호' })
  oldnum: string;
  @Column({ nullable: false, default: '', comment: '이름' })
  num: string;
  @Column({ nullable: false, length: 50, default: '', comment: '제목' })
  title: string;
  @Column({ nullable: false, length: 50, default: '', comment: '카테고리' })
  category: string;
  @Column({ nullable: false, length: 50, default: '', comment: '오디오' })
  audio: string;
  @Column({ nullable: false, length: 50, default: '', comment: '악보 이미지' })
  image: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
}

@Entity('sys_gyo')
export class SysGyo {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: 0, comment: '인덱스' })
  gyoidx: number;
  @Column({ nullable: false, default: 0, comment: '버전' })
  version: number;
  @Column({ nullable: false, length: 50, default: '', comment: '제목' })
  title: string;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
  @Column({
    nullable: false,
    default: 0,
    comment: '0:다같이 없음, 1:다같이 있음',
  })
  together: number;
}

@Entity('sys_kido')
export class SysKido {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: 1, comment: '버전' })
  version: number;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
}

@Entity('sys_sado')
export class SysSado {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable: false, default: 1, comment: '버전' })
  version: number;
  @Column('longtext', { nullable: false, default: '', comment: '내용' })
  content: string;
}
