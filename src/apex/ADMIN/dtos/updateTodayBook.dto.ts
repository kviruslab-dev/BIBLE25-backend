import { IsOptional, IsString } from 'class-validator';

export class UpdateTodayBookDto {
  @IsOptional()
  id: string;

  @IsString()
  @IsOptional()
  today: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  song: string;

  @IsString()
  @IsOptional()
  content: string;
}
