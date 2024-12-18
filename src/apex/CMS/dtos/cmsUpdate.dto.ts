import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class elementDto {
  @ApiProperty({
    example: 1,
    description: 'id',
    required: true,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: '상담신청',
    description: 'status',
    required: false,
  })
  @IsString()
  @IsOptional()
  status: string;

  @ApiProperty({
    example: '메모',
    description: 'memo',
    required: false,
  })
  @IsString()
  @IsOptional()
  memo: string;

  @ApiProperty({
    example: '통신사',
    description: 'company',
    required: false,
  })
  @IsString()
  @IsOptional()
  company: string;
}
