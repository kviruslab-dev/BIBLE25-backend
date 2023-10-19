import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InsertBoardDto {
  @ApiProperty({
    example: '',
    description: 'title',
    required: false,
  })
  @IsString()
  title = '';

  @ApiProperty({
    example: '',
    description: 'link',
    required: false,
  })
  @IsString()
  link = '';

  @ApiProperty({
    example: '',
    description: 'image',
    required: false,
  })
  @IsString()
  image = '';

  @ApiProperty({
    example: 0,
    description: 'type',
    required: false,
  })
  @IsNumber()
  type = 0;
}
