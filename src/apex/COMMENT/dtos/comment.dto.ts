import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({
    example: '010-1234-5678',
    description: 'phone',
    required: true,
  })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '댓글 내용입니다.',
    description: 'comment',
    required: true,
  })
  @IsString()
  comment: string;

  @ApiProperty({
    example: '상품 정보입니다.',
    description: 'product',
    required: true,
  })
  @IsString()
  product: string;
}
