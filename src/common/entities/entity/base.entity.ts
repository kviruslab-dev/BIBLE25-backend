import { CreateDateColumn, UpdateDateColumn, PrimaryColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryColumn({ unique: true })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
