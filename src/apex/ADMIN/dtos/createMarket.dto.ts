import { IsString } from 'class-validator';

export class CreateMarketDto {
  @IsString()
  title: string;

  @IsString()
  start_date: string;

  @IsString()
  end_date: string;

  @IsString()
  page: string;

  @IsString()
  location: string;

  @IsString()
  rate: string;

  @IsString()
  link: string;

  @IsString()
  active: string;

  @IsString()
  city: string;

  @IsString()
  timezone: string;
}
