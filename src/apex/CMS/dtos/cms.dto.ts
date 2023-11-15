import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CmsDto {
  @ApiProperty({ example: '홍길동', description: 'name', required: true })
  @IsString()
  name: string;

  @ApiProperty({ example: '01010101010', description: 'phone', required: true })
  @IsString()
  phone: string;
}
