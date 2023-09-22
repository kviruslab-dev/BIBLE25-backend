import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InquireDto {
  @ApiProperty({ example: '홍길동', description: 'name', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: '01010101010', description: 'phone', required: true })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '제휴를 원합니다.',
    description: 'content',
    required: true,
  })
  @IsString()
  content: string;
}
