import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InsertAdvertisementDto {
  @ApiProperty({
    example: 1,
    description: 'location',
    required: false,
  })
  @IsNumber()
  location = 1;

  @ApiProperty({
    example: 0,
    description: 'page',
    required: false,
  })
  @IsNumber()
  page = 0;

  @ApiProperty({
    example: 0,
    description: 'tick',
    required: false,
  })
  @IsNumber()
  tick = 0;

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
    example: '',
    description: 'start_date',
    required: false,
  })
  @IsString()
  start_date = '';

  @ApiProperty({
    example: '',
    description: 'end_date',
    required: false,
  })
  @IsString()
  end_date = '';

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
    example: 'KR',
    description: 'country',
    required: false,
  })
  @IsString()
  country = 'KR';

  @ApiProperty({
    example: '',
    description: 'city',
    required: false,
  })
  @IsString()
  city = '';

  @ApiProperty({
    example: '',
    description: 'title',
    required: false,
  })
  @IsString()
  title = '';

  @ApiProperty({
    example: '서울',
    description: 'timezone',
    required: false,
  })
  @IsString()
  timezone = '서울';

  @ApiProperty({
    example: 1,
    description: 'showyn',
    required: false,
  })
  @IsNumber()
  showyn = 1;

  @ApiProperty({
    example: 1,
    description: 'active',
    required: false,
  })
  @IsNumber()
  active = 1;

  @ApiProperty({
    example: 0,
    description: 'rate',
    required: false,
  })
  @IsNumber()
  rate = 0;
}
