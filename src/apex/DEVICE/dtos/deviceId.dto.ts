import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class DeviceIdDto {
  @ApiProperty({
    example: '디바이스 아이디',
    description: '디바이스 아이디',
    required: false,
  })
  @IsString()
  deviceId: string;

  @ApiProperty({
    example: false,
    description: '푸시알림 허용유무',
    required: false,
  })
  @IsOptional()
  @IsNumber()
  pushyn: number;

  @ApiProperty({
    example: '12.3',
    description: '위도',
    required: false,
  })
  @IsOptional()
  @IsString()
  lat: string;

  @ApiProperty({
    example: '45.6',
    description: '경도',
    required: false,
  })
  @IsOptional()
  @IsString()
  lon: string;
}

export class PasswordDto {
  @ApiProperty({
    example: '디바이스 아이디',
    description: '디바이스 아이디',
    required: false,
  })
  @IsString()
  deviceId?: string;

  @ApiProperty({
    example: '비밀번호',
    description: '비밀번호',
    required: true,
  })
  @IsString()
  password: string;
}
