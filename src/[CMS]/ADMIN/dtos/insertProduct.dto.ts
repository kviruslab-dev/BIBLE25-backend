import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InsertProductDto {
  @ApiProperty({
    example: 0,
    description: 'gubun',
    required: false,
  })
  @IsNumber()
  gubun = 0;

  @ApiProperty({
    example: 0,
    description: 'tick',
    required: false,
  })
  @IsNumber()
  tick = 0;

  @ApiProperty({
    example: '',
    description: 'title',
    required: false,
  })
  @IsString()
  title = '';

  @ApiProperty({
    example: 0,
    description: 'money',
    required: false,
  })
  @IsNumber()
  money = 0;

  @ApiProperty({
    example: String(''),
    description: 'star',
    required: false,
  })
  @IsString()
  star = '3.5';

  @ApiProperty({
    example: 0,
    description: 'dc',
    required: false,
  })
  @IsNumber()
  dc = 0;

  @ApiProperty({
    example: '',
    description: 'image',
    required: false,
  })
  @IsString()
  image = '';

  @ApiProperty({
    example: '',
    description: 'link',
    required: false,
  })
  @IsString()
  link = '';

  @ApiProperty({
    example: 0,
    description: 'showyn',
    required: false,
  })
  @IsNumber()
  showyn = 0;

  @ApiProperty({
    example: '',
    description: 'admin',
    required: false,
  })
  @IsString()
  admin = '';

  @ApiProperty({
    example: '',
    description: 'note',
    required: false,
  })
  @IsString()
  note = '';

  @ApiProperty({
    example: 0,
    description: 'sequence',
    required: false,
  })
  @IsNumber()
  sequence = 0;

  @ApiProperty({
    example: 0,
    description: 'active',
    required: false,
  })
  @IsNumber()
  active = 0;
}
