import { IsString } from 'class-validator';

export class CreateCalumDto {
  @IsString()
  today: string;

  @IsString()
  title: string;

  @IsString()
  song: string;

  @IsString()
  content: string;
}
