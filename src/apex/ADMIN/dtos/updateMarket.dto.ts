import { IsNumber, IsString } from 'class-validator';

export class UpdateMarketDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsNumber()
  page: string;

  @IsNumber()
  location: number;

  @IsNumber()
  rate: string;

  @IsString()
  link: string;

  @IsNumber()
  active: string;

  @IsString()
  city: string;

  @IsString()
  timezone: string;
}
