import { IsString } from 'class-validator';

export class CreateSmsDto {
  @IsString()
  receiver: string;

  @IsString()
  senderName: string;

  @IsString()
  senderPhone: string;

  @IsString()
  senderContent: string;
}
