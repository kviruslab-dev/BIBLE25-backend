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
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { SearchService } from './search.service';

@ApiTags('SEARCH')
@Controller('search')
@UseInterceptors(SuccessInterceptor)
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
      return await this.searchService.findAndCountJusuk(take, page, keyword);
    }

    if (name === 'kanghae') {
      return await this.searchService.findAndCountKanghae(take, page, keyword);
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
      return await this.searchService.findOneBible(id);
    }
    if (name === 'dic') {
      return await this.searchService.findOneDic(id);
    }

    if (name === 'photodic') {
      return await this.searchService.findOnePhotodic(id);
    }

    if (name === 'biblemap') {
      return await this.searchService.findOneBiblemap(id);
    }

    if (name === 'jusuk') {
      return await this.searchService.findOneJusuk(id);
    }

    if (name === 'kanghae') {
      return await this.searchService.findOneKanghae(id);
    }
  }
}
