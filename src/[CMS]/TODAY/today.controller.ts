import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { TodayService } from './today.service';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@UseInterceptors(SuccessInterceptor)
@Controller('today')
export class TodayController {
  constructor(
    private readonly todayService: TodayService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Get()
  async getData(
    @Query('type') type: string,
    @Query('id') id: number,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다. ( maincontents | mainimages | malsum | good | kido | calum | today | book | cross | letter )`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type === 'maincontents') {
      {
        const condition = {
          select:
            'id, SUBSTRING(content, 1, 40) as content, name, title, image',
          table: 'today_content',
          where: `active = 1`,
          orderBy: 'gubun asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.todayService.findAndCountInMainContent(condition);
      }
    }

    const gubunFromType = await this.todayService.getGubunFromType(type);

    try {
      const condition = {
        select: 'id, title, image, link',
        table: 'market',
        where: `page=${pageFromType} and timezone='${timezone}' and city='${city}' and active=1`,
      };

      return await this.queryRunnerService.findOne(condition);
    } catch (error) {
      const condition = {
        select: 'id, title, image, link',
        table: 'market',
        where: `page=${pageFromType} and city='base' and active=1`,
      };

      return await this.queryRunnerService.findOne(condition);
    }
  }
}
