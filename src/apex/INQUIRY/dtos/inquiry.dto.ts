import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class InquiryDto {
  @ApiProperty({
    example: '홍길동',
    description: '이름',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '010-1234-1234',
    description: '전화번호',
    required: true,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '성경 읽으면서 A++ 한우 광고를 봐야 한다니요..',
    description: '내용',
    required: true,
  })
  @IsString()
  comment: string;
}
