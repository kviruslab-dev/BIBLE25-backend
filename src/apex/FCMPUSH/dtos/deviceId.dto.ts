import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeviceIdDto {
  @IsString()
  deviceId: string;

  @IsOptional()
  @IsNumber()
  pushyn: number;

  @IsOptional()
  @IsString()
  lat: string;

  @IsOptional()
  @IsString()
  lon: string;
}
