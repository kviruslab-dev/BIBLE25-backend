import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', select: false })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', select: false })
  updatedAt: Date;
}
