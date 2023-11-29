import { IsString } from 'class-validator';

export class UpdateCalumDto {
  @IsString()
  id: string;

  @IsString()
  today: string;

  @IsString()
  title: string;

  @IsString()
  song: string;

  @IsString()
  content: string;
}
