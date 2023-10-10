import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CommentService } from './comment.service';
import { CommentDto } from './dtos/comment.dto';

@ApiTags('COMMENT')
@Controller('comment')
@UseInterceptors(SuccessInterceptor)
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({ summary: '댓글 저장하기' })
  @Post()
  async createComment(@Body() body: CommentDto) {
    return this.commentService.createComment(body);
  }
}
