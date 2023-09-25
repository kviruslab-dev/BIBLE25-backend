import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { TodayService } from './today.service';
import {
  TODAY_CONTENTS,
  TODAY_LISTS,
  TODAY_SELECT_CONDITION,
} from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { getToday } from 'src/common/utils/functions';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('TODAY')
@Controller('today')
@UseInterceptors(SuccessInterceptor)
export class TodayController {
  constructor(
    private readonly todayService: TodayService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}
  @ApiOperation({ summary: '메인 컨텐츠 가져오기' })
  @Get('maincontents')
  async getMainContents() {
    try {
      const condition = {
        select: 'id, SUBSTRING(content, 1, 40) as content, name, title, image',
        table: 'today_content',
        where: `active = 1`,
        orderBy: 'gubun asc',
        limit: 10,
        offset: 0,
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
          limit: 10,
          offset: 0,
        };
      };

      return await this.todayService.findInMainContents(condition);
    }
  }

  @ApiOperation({ summary: '메인 이미지 가져오기' })
  @Get('mainimages')
  async getMainImages() {
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

  @ApiParam({ name: 'name', required: true, type: String })
  @ApiQuery({ name: 'take', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiOperation({
    summary: '최신 데이터 가져오기 & 리스트 가져오기',
  })
  @Get(':name')
  async getContent(
    @Param('name') name: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
    @Query('keyword') keyword?: string,
  ) {
    if (!TODAY_CONTENTS.includes(name) && !TODAY_LISTS.includes(name)) {
      throw new HttpException(
        `올바른 name 값을 입력해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const contentName = name.replace('list', '');
    const today = getToday();
    const gubun = Number(TODAY_CONTENTS.indexOf(contentName));
    const tableCondition = gubun <= 6 ? 'today_content' : 'today_image';

    if (TODAY_CONTENTS.includes(name)) {
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

    if (TODAY_LISTS.includes(name)) {
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
  }

  @ApiParam({ name: 'name', required: true, type: String })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiOperation({ summary: 'id를 통해 TODAY 데이터 가져오기' })
  @Get(':name/:id')
  async getConentById(@Param('name') name: string, @Param('id') id: number) {
    if (!TODAY_CONTENTS.includes(name)) {
      throw new HttpException(
        `올바른 name 값을 입력해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const gubun = TODAY_CONTENTS.indexOf(name);
    const tableCondition = gubun <= 6 ? 'today_content' : 'today_image';

    const condition = {
      select: TODAY_SELECT_CONDITION[gubun],
      table: tableCondition,
      where: `id=${id}`,
    };

    return await this.queryRunnerService.findOne(condition);
  }
}
