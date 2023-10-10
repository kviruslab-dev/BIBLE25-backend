import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('comment')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  //! 전화번호
  @ApiProperty({ example: '01012345678', description: 'phone', required: true })
  @Column({
    comment: 'phone',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  //! 댓글
  @ApiProperty({
    example: '댓글 내용입니다.',
    description: 'comment',
    required: true,
  })
  @Column({
    comment: 'comment',
  })
  @IsString()
  @IsNotEmpty()
  comment: string;
}
