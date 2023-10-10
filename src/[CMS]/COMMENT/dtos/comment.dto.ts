import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CommentDto {
  @ApiProperty({ example: '01012345678', description: 'phone', required: true })
  @IsString()
  phone: string;

  @ApiProperty({
    example: '댓글 내용입니다.',
    description: 'comment',
    required: true,
  })
  @IsString()
  comment: string;
}
