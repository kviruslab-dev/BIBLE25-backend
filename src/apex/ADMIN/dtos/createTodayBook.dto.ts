import { IsString } from 'class-validator';

export class CreateTodayBookDto {
  @IsString()
  today: string;

  @IsString()
  title: string;

  @IsString()
  song: string;

  @IsString()
  content: string;
}
