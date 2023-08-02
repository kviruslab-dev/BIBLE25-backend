import { IsString } from 'class-validator';

export class InquireDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  content: string;
}
