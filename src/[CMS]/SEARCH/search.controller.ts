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
import { SEARCH_CONTENTS } from 'src/common/const';
import { CustomedSuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { SearchService } from './search.service';

@ApiTags('SEARCH')
@Controller('search')
@UseInterceptors(CustomedSuccessInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiQuery({ name: 'keyword', required: true, type: String })
  @ApiOperation({ summary: '전체 검색 결과 가져오기' })
  @Get('total')
  async getTotal(@Query('keyword') keyword: string) {
    return await this.searchService.findSearchingData(5, 0, keyword);
  }

  @ApiParam({
    name: 'name',
    required: true,
    type: String,
    description: '이름 : bible, dic, photodic, biblemap, jusuk, kanghae',
  })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: true, type: String })
  @ApiOperation({ summary: '컨텐츠에 대한 검색 데이터 가져오기' })
  @Get(':name')
  async getContent(
    @Param('name') name: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
    @Query('keyword') keyword?: string,
  ) {
    if (!SEARCH_CONTENTS.includes(name)) {
      throw new HttpException(
        `올바른 name 값을 입력해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (name === 'bible') {
      return await this.searchService.findAndCountBible(take, page, keyword);
    }
    if (name === 'dic') {
      return await this.searchService.findAndCountDic(take, page, keyword);
    }

    if (name === 'photodic') {
      return await this.searchService.findAndCountPhotodic(take, page, keyword);
    }

    if (name === 'biblemap') {
      return await this.searchService.findAndCountBiblemap(take, page, keyword);
    }

    if (name === 'jusuk') {
      const calcutaleTotal = true;
      return await this.searchService.findAndCountJusuk(
        take,
        page,
        keyword,
        calcutaleTotal,
      );
    }

    if (name === 'kanghae') {
      const calcutaleTotal = true;
      return await this.searchService.findAndCountKanghae(
        take,
        page,
        keyword,
        calcutaleTotal,
      );
    }
  }

  @ApiParam({
    name: 'name',
    required: true,
    type: String,
    description: '이름 : bible, dic, photodic, biblemap, jusuk, kanghae',
  })
  @ApiParam({ name: 'id', required: true, type: Number })
  @ApiOperation({ summary: 'id를 통해 검색 데이터 가져오기' })
  @Get(':name/:id')
  async getContentById(@Param('name') name: string, @Param('id') id: number) {
    if (!SEARCH_CONTENTS.includes(name)) {
      throw new HttpException(
        `올바른 name 값을 입력해주세요.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (name === 'bible') {
      const list = await this.searchService.findOneBible(id);
      return { list };
    }
    if (name === 'dic') {
      const list = await this.searchService.findOneDic(id);
      return { list };
    }

    if (name === 'photodic') {
      const list = await this.searchService.findOnePhotodic(id);
      return { list };
    }

    if (name === 'biblemap') {
      const list = await this.searchService.findOneBiblemap(id);
      return { list };
    }

    if (name === 'jusuk') {
      const list = await this.searchService.findOneJusuk(id);
      return { list };
    }

    if (name === 'kanghae') {
      const list = await this.searchService.findOneKanghae(id);
      return { list };
    }
  }
}
