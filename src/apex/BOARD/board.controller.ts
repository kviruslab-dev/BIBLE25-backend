import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { BoardService } from './board.service';
import { InquireDto } from './dtos/board.dto';

@ApiTags('BOARD')
@Controller('board')
@UseInterceptors(SuccessInterceptor)
export class BoardController {
  constructor(
    private readonly boardService: BoardService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Post()
  async createInquire(@Body() body: InquireDto) {
    const condition = {
      table: 'contact',
      column: 'name, phone, content',
      values: `'${body.name}', '${body.phone}', '${body.content}'`,
    };

    await this.queryRunnerService.insert(condition);
  }

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description: '타입 : 1, 2, 3',
  })
  @Get()
  async getData(@Query('type') type: string) {
    if (['1', '2', '3'].includes(type)) {
      const condition = {
        select: 'id, image, link',
        table: 'board',
        where: `type = ${type}`,
      };

      return await this.queryRunnerService.findOne(condition);
    }

    if (type === 'footer') {
      const condition = {
        select: 'id, link',
        table: 'board',
        where: `type is NULL`,
        orderBy: 'id asc',
        limit: 10,
        offset: 0,
      };

      return await this.queryRunnerService.findAndCount(condition);
    }
  }
}
