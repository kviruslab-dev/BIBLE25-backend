import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMalsumDto {
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  today: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  yojul: string;

  @IsString()
  @IsOptional()
  song: string;

  @IsString()
  @IsOptional()
  bible: string;

  @IsString()
  @IsOptional()
  sungchal: string;

  @IsString()
  @IsOptional()
  kido: string;

  @IsString()
  @IsOptional()
  content: string;
}
