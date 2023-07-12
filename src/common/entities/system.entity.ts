import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('connection')
export class UserConnect {
  @PrimaryGeneratedColumn()
  id: number;
  @CreateDateColumn()
  create_at: Date;
  @Column({
    nullable: false,
    length: 100,
    default: '',
    comment: 'ip',
  })
  iplocal: string;
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
}
