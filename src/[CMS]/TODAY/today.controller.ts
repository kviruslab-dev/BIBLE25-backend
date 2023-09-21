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
import { TODAY_CONTENTS, TODAY_SELECT_CONDITION } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { getToday } from 'src/common/utils/functions';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('TODAY')
@Controller('today')
@UseInterceptors(SuccessInterceptor)
export class TodayController {
  constructor(
    private readonly todayService: TodayService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description:
      '타입 : maincontents, mainimages, malsum, good, kido, calum, today, book, cross, letter',
  })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'take', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @Get()
  async getData(
    @Query('type') type: string,
    @Query('id') id: number,
    @Query('take') take?: number,
    @Query('page') page?: number,
    @Query('keyword') keyword?: string,
  ) {
    // TODO [POST] today/cal_create  -- 어드민 툴에서 사용하는 API
    // TODO [POST] today/cal_change  -- 어드민 툴에서 사용하는 API
    // TODO [GET] today/contents_gubun  -- 어드민 툴에서 사용하는 API
    // TODO [POST] today/content_cal -- 어드민 툴 API 만들기 전 테스트로 만든 API
    // TODO [GET] today/content_name -- ??? 어드민 툴에서 사용하는지 모름
    // TODO [GET] today/lifecycle

    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // TODO [GET] today/content
    if (type === 'maincontents') {
      try {
        const condition = {
          select:
            'id, SUBSTRING(content, 1, 40) as content, name, title, image',
          table: 'today_content',
          where: `active = 1`,
          orderBy: 'gubun asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.todayService.findInMainContents(condition);
      } catch {
        const today = getToday();

        const condition = (gubun: number) => {
          return {
            select:
              'id, SUBSTRING(content, 1, 40) as content, name, title, image',
            table: 'today_content',
            where: `today<='${today}' and gubun=${gubun}`,
            orderBy: 'today desc',
            limit: 1,
            offset: 0,
          };
        };

        return await this.todayService.findInMainContents(condition);
      }
    }

    // TODO [GET] today/content_image
    if (type === 'mainimages') {
      try {
        const condition = (gubun: number) => {
          return {
            select: 'id, image',
            table: 'today_image',
            where: `active = 1 and gubun=${gubun}`,
            orderBy: 'today desc',
            limit: 3,
            offset: 0,
          };
        };

        return await this.todayService.findInMainImages(condition);
      } catch {
        const today = getToday();

        const condition = (gubun: number) => {
          return {
            select: 'id, image',
            table: 'today_image',
            where: `today<='${today}' and gubun=${gubun}`,
            orderBy: 'today desc',
            limit: 3,
            offset: 0,
          };
        };

        return await this.todayService.findInMainImages(condition);
      }
    }
    /**
     *
     */
    if (TODAY_CONTENTS.includes(type)) {
      const gubun = TODAY_CONTENTS.indexOf(type);
      const today = getToday();
      const tableCondition = gubun <= 6 ? 'today_content' : 'today_image';

      if (!id) {
        // TODO [GET] today/['malsumlist', ... , 'letterlist'] (keyword 있음)
        if (keyword) {
          const condition = {
            select: 'id, title',
            table: tableCondition,
            where: `title like '%${keyword.trim()}%' and today <= '${today}' and gubun=${gubun}`,
            orderBy: 'today desc',
            limit: String(take ? take : 10),
            offset: String(page ? take * (page - 1) : 0),
          };

          return await this.queryRunnerService.findAndCount(condition);
        }

        // TODO [GET] today/['malsumlist', ... , 'letterlist'] (keyword 없음)
        if (!keyword) {
          const condition = {
            select: 'id, title',
            table: tableCondition,
            where: `today <= '${today}' and gubun=${gubun}`,
            orderBy: 'today desc',
            limit: String(take ? take : 10),
            offset: String(page ? take * (page - 1) : 0),
          };

          return await this.queryRunnerService.findAndCount(condition);
        }
      }

      if (id) {
        // TODO [GET] today/['malsum',...,'letter'] -> id = -1;
        if (id === -1) {
          const condition = {
            select: TODAY_SELECT_CONDITION[gubun],
            table: tableCondition,
            where: `today <= '${today}' and gubun=${gubun}`,
            orderBy: 'today desc',
            limit: 1,
            offset: 0,
          };

          return await this.todayService.findOneInActive(condition);
        }

        // TODO [GET] today/:name/:id
        if (id > 0) {
          const condition = {
            select: TODAY_SELECT_CONDITION[gubun],
            table: tableCondition,
            where: `id=${id}`,
          };

          return await this.queryRunnerService.findOne(condition);
        }
      }
    }
  }
}
