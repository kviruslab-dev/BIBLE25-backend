import { IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CmsDto {
  @ApiProperty({ example: '홍길동', description: 'name', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: '01010101010', description: 'phone', required: true })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '상담신청',
    description: 'status',
    required: false,
  })
  @IsString()
  @IsOptional()
  status = '상담신청';
}
