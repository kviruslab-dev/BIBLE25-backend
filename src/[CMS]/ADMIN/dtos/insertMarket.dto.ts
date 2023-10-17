import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class InsertMarketDto {
  //! type: 테이블 종류와 연관
  @ApiProperty({ example: 'main', description: '타입', required: true })
  @IsString()
  type: string;

  @IsString()
  title = '디폴트 제목';

  @IsString()
  country = 'KR';

  @IsString()
  timezone = '서울';

  @IsString()
  city = 'base';

  @IsNumber()
  location = 0;

  @IsNumber()
  page = 0;

  @IsNumber()
  tick = 0;

  @IsString()
  image = ' ';

  @IsString()
  link = ' ';

  @IsString()
  start_date = '시작일';

  @IsString()
  end_date = '종료일';

  @IsNumber()
  showyn = 0;

  @IsString()
  admin = ' ';

  @IsString()
  note = ' ';

  @IsNumber()
  active = 0;

  @IsNumber()
  rate = 0;
}
