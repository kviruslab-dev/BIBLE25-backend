import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  gubun: string;

  @IsString()
  money: string;

  @IsString()
  star: string;

  @IsString()
  dc: string;

  @IsString()
  sequence: string;

  @IsString()
  link: string;

  @IsString()
  active: string;
}
