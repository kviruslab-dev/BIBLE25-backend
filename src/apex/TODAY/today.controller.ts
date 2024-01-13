import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  TODAY_CONTENTS,
  TODAY_GUBUN,
  TODAY_LISTS,
  TODAY_SELECT_CONDITION,
} from 'src/common/const';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { getToday } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { TodayService } from './today.service';

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

      const list = await this.todayService.findInMainContents(condition);
      //! 축복기도 이름으로 들어온 데이터를 이야기메시지로 변경합니다. (2024.01.01 이후 적용)
      list[2].name = '이야기메시지';

      //! 칼럼 name 값이 빈값으로 들어오는 경우가 존재합니다. (C#으로 만든 어드민으로 예상)
      //! name 값이 비어있는 경우, 메인화면에 칼럼 미리보기가 그려지지 않기에 로직을 추가합니다.
      list[3].name = '칼럼';

      // // //! 오늘의 말씀을 톨레레게로 (바이블25 부사장님 요청. 230109)
      list[4].name = '톨레레게';

      return { list, total: 6 };
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

  @ApiParam({
    name: 'name',
    required: true,
    type: String,
    description:
      '이름 : malsum, good, kido, calum, today, book, cross, letter, iyagi 또는 malsumlist, goodlist, kidolist, calumlist, todaylist, booklist, crosslist, letterlist iyagilist',
  })
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
    const gubun = TODAY_GUBUN[contentName];
    const tableCondition = gubun <= 6 ? 'today_content' : 'today_image';

    if (TODAY_CONTENTS.includes(name)) {
      const condition = {
        select: TODAY_SELECT_CONDITION[contentName],
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
        let whereCondition: string;
        //! 축복기도 데이터와 이야기메시지를 구분하기 위한 로직입니다. (2024.01.01 이후 적용)
        if (contentName === 'iyagi') {
          whereCondition = `title like '%${keyword.trim()}%' and today <= '${today}' and today >= '2024-01-01' and gubun=${gubun}`;
        } else if (contentName === 'kido') {
          whereCondition = `title like '%${keyword.trim()}%' and today < '2024-01-01' and gubun=${gubun}`;
        } else {
          whereCondition = `title like '%${keyword.trim()}%' and today <= '${today}' and gubun=${gubun}`;
        }

        const condition = {
          select: 'id, title',
          table: tableCondition,
          where: whereCondition,
          orderBy: 'today desc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }

      if (!keyword) {
        let whereCondition: string;
        //! 축복기도 데이터와 이야기메시지를 구분하기 위한 로직입니다. (2024.01.01 이후 적용)
        if (contentName === 'iyagi') {
          whereCondition = `today <= '${today}' and today >= '2024-01-01' and gubun=${gubun}`;
        } else if (contentName === 'kido') {
          whereCondition = `today < '2024-01-01' and gubun=${gubun}`;
        } else {
          whereCondition = `today <= '${today}' and gubun=${gubun}`;
        }

        const condition = {
          select: 'id, title',
          table: tableCondition,
          where: whereCondition,
          orderBy: 'today desc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }
    }
  }

  @ApiParam({
    name: 'name',
    required: true,
    type: String,
    description:
      '이름 : malsum, good, kido, calum, today, book, cross, letter, iyagi',
  })
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

    const gubun = TODAY_GUBUN[name];
    const tableCondition = gubun <= 6 ? 'today_content' : 'today_image';

    const condition = {
      select: TODAY_SELECT_CONDITION[name],
      table: tableCondition,
      where: `id=${id}`,
    };

    return await this.queryRunnerService.findOne(condition);
  }
}
