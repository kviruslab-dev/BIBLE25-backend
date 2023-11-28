import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('board')
export class Board {
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

  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지클릭시링크이동',
  })
  link: string;

  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: '이미지링크',
  })
  image: string;

  @Column({
    nullable: false,
    default: 0,
    comment: '타입',
  })
  type: number;
}
