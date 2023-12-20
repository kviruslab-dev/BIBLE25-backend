import { ApiProperty } from '@nestjs/swagger';

export class CreateInquiryRes {
  @ApiProperty({
    example: true,
    description: 'success',
  })
  success: boolean;

  @ApiProperty({
    example: '2023-12-20T02:48:01.532Z',
    description: 'timestamp',
  })
  timestamp: string;

  @ApiProperty({
    example: '수정/요청사항이 등록되었습니다.',
    description: 'data',
  })
  data: string;
}

export class ExistInquiryRes {
  @ApiProperty({
    example: true,
    description: 'success',
  })
  success: boolean;

  @ApiProperty({
    example: '2023-12-20T02:48:01.532Z',
    description: 'timestamp',
  })
  timestamp: string;

  @ApiProperty({
    example: '동일한 수정/요청사항이 존재합니다.',
    description: 'data',
  })
  data: string;
}
