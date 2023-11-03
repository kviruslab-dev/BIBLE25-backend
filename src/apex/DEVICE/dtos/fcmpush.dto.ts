import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class fcmpushDto {
  @ApiProperty({
    example: '디바이스 아이디',
    description: '디바이스 아이디',
    required: false,
  })
  @IsString()
  deviceId?: string;

  @ApiProperty({
    example: '메세지 제목',
    description: '메세지 제목',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '메세지 내용',
    description: '메세지 내용',
    required: true,
  })
  @IsString()
  content: string;
}

export class fcmpushAllDto {
  @ApiProperty({
    example: '메세지 제목',
    description: '메세지 제목',
    required: true,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: '메세지 내용',
    description: '메세지 내용',
    required: true,
  })
  @IsString()
  content: string;
}
