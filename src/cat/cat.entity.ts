import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Cat extends BaseEntity {
  @ApiProperty({
    example: 'osuolfou@naver.com',
    description: 'email',
    required: true,
  })
  @Column({
    unique: true,
    update: false,
  })
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'osuolfou',
    description: 'name',
    required: true,
  })
  @Column()
  @Transform(({ value }) => value.trim())
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: '12345678',
    description: 'password',
    required: true,
  })
  @Column()
  @IsString()
  @IsNotEmpty()
  password: string;

  @Column({
    // nullable: true,
    default:
      'https://raw.githubusercontent.com/bobpull/bobpull/master/front/build/img/pull.png',
  })
  @IsString()
  imgUrl: string;
}
