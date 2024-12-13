import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: '프로필 닉네임',
    description: '프로필 닉네임',
    required: false,
  })
  @IsString()
  profile_nickname: string;

  @ApiProperty({
    example: '카카오계정(이메일)',
    description: '카카오계정(이메일)',
    required: false,
  })
  @IsString()
  account_email: string;

  @ApiProperty({
    example: '이름',
    description: '이름',
    required: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'adid',
    description: 'adid',
    required: false,
  })
  @IsString()
  adid: string;

  @ApiProperty({
    example: 'phone_number',
    description: 'phone_number',
    required: false,
  })
  @IsString()
  phone_number: string;

  @ApiProperty({
    example: 'age',
    description: 'age',
    required: false,
  })
  @IsString()
  age: string;

  @ApiProperty({
    example: 'gender',
    description: 'gender',
    required: false,
  })
  @IsString()
  gender: string;

  @ApiProperty({
    example: 'model',
    description: 'model',
    required: false,
  })
  @IsString()
  model: string;

  @ApiProperty({
    example: 'carrier',
    description: 'carrier',
    required: false,
  })
  @IsString()
  carrier: string;

  @ApiProperty({
    example: 'marketing_information',
    description: 'marketing_information',
    required: false,
  })
  @IsNumber()
  marketing_information: number;

  @ApiProperty({
    example: 'receive_marketing',
    description: 'receive_marketing',
    required: false,
  })
  @IsNumber()
  receive_marketing: number;

  @ApiProperty({
    example: 'email',
    description: 'email',
    required: false,
  })
  @IsNumber()
  email: number;

  @ApiProperty({
    example: 'sms',
    description: 'sms',
    required: false,
  })
  @IsNumber()
  sms: number;

  @ApiProperty({
    example: 'telephone',
    description: 'telephone',
    required: false,
  })
  @IsNumber()
  telephone: number;
}
