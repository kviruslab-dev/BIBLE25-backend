import { PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

export class BaseAutoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  create_at: Date;
}
