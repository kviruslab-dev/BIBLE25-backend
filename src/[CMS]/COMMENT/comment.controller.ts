import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
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

  @ApiQuery({ name: 'take', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({ summary: '댓글 불러오기' })
  @Get()
  async getComment(@Query('take') take?: number, @Query('page') page?: number) {
    const condition = {
      select: 'createAt, phone, comment',
      table: 'comment',
      where: `TRUE`,
      orderBy: 'id desc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    return await this.commentService.findAndCount(condition);
  }
}
