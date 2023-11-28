import { IsString } from 'class-validator';

export class UpdateBoardDto {
  @IsString()
  id: string;

  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  type: string;
}
