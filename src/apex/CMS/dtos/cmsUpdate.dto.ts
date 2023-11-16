import { IsNumber, IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CmsUpdateDto {
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
    required: true,
  })
  @IsString()
  status: string;
}
