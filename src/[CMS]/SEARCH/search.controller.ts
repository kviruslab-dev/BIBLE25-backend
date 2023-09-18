import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { SearchService } from './search.service';

@ApiTags('SEARCH')
@Controller('search')
@UseInterceptors(SuccessInterceptor)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description: '타입 : total, bible, dic, photodic, biblemap, jusuk, kanghae',
  })
  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @Get()
  async getData(
    @Query('type') type: string,
    @Query('id') id: number,
    @Query('take') take?: number,
    @Query('page') page?: number,
    @Query('keyword') keyword?: string,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    //! 전체 검색
    if (type === 'total') {
      return await this.searchService.findSearchingData(5, 0, keyword);
    }

    //! 성경 검색
    if (type === 'bible') {
      return id
        ? await this.searchService.findOneBible(id)
        : await this.searchService.findAndCountBible(take, page, keyword);
    }

    //! 사전 검색
    if (type === 'dic') {
      return id
        ? await this.searchService.findOneDic(id)
        : await this.searchService.findAndCountDic(take, page, keyword);
    }

    //! 포토사전 검색
    if (type === 'photodic') {
      return id
        ? await this.searchService.findOnePhotodic(id)
        : await this.searchService.findAndCountPhotodic(take, page, keyword);
    }

    //! 성서 지도 검색
    if (type === 'biblemap') {
      return id
        ? await this.searchService.findOneBiblemap(id)
        : await this.searchService.findAndCountBiblemap(take, page, keyword);
    }

    //! 주석 검색
    if (type === 'jusuk') {
      return id
        ? await this.searchService.findOneJusuk(id)
        : await this.searchService.findAndCountJusuk(take, page, keyword);
    }

    //! 강해 검색
    if (type === 'kanghae') {
      return id
        ? await this.searchService.findOneKanghae(id)
        : await this.searchService.findAndCountKanghae(take, page, keyword);
    }
  }
}
