import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMalsumDto {
  @IsString()
  today: string;

  @IsString()
  title: string;

  @IsString()
  yojul: string;

  @IsString()
  song: string;

  @IsString()
  bible: string;

  @IsString()
  sungchal: string;

  @IsString()
  kido: string;

  @IsString()
  content: string;

  @IsNumber()
  @IsOptional()
  frame = 1;

  @IsNumber()
  @IsOptional()
  gubun = 1;

  @IsString()
  @IsOptional()
  writer = '말씀따라';

  @IsString()
  @IsOptional()
  name = '말씀따라';

  @IsNumber()
  @IsOptional()
  active = 0;
}
