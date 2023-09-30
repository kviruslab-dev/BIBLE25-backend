import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('error_log')
export class ErrorLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  //! 상태 코드
  @ApiProperty({
    example: 404,
    description: 'status_code',
    required: true,
  })
  @Column({
    comment: 'status_code',
  })
  @IsNumber()
  @IsNotEmpty()
  status_code: number;

  //! method
  @ApiProperty({
    example: 'GET',
    description: 'method',
    required: true,
  })
  @Column({
    comment: 'method',
  })
  @IsString()
  @IsNotEmpty()
  method: string;

  //! 오류 발생 url
  @ApiProperty({
    example: '/chansong/song?id=12341234',
    description: 'url',
    required: true,
  })
  @Column({
    comment: 'url',
  })
  @IsString()
  @IsNotEmpty()
  url: string;

  //! error 내용
  @ApiProperty({
    example: '데이터가 존재하지 않습니다.',
    description: 'error',
    required: true,
  })
  @Column({
    comment: 'error',
  })
  @IsString()
  @IsNotEmpty()
  error: string;

  //! 동일 오류 횟수
  @ApiProperty({
    example: 10,
    description: 'count',
    required: false,
  })
  @Column({
    comment: 'count',
  })
  @IsNumber()
  @IsNotEmpty()
  count: number;
}
