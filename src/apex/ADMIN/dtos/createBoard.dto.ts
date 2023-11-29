import { IsString } from 'class-validator';

export class CreateBoardDto {
  @IsString()
  title: string;

  @IsString()
  link: string;

  @IsString()
  type: string;
}
