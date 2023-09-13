import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { SearchService } from './search.service';

@UseInterceptors(SuccessInterceptor)
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

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
        `type 값을 입력하지 않았습니다. ( maincontents | mainimages | malsum | good | kido | calum | today | book | cross | letter )`,
        HttpStatus.BAD_REQUEST,
      );
    }

    //! 전체 검색 (keyword, take, page)
    if (type === 'total') {
      return await this.searchService.findSearchingData(5, 0, keyword);
    }

    //! 성경 검색 (keyword, take, page 또는 id)
    if (type === 'bible') {
      if (id) {
        return await this.searchService.findOneBible(id);
      }

      if (!id) {
        return await this.searchService.findAndCountBible(take, page, keyword);
      }
    }

    //! 사전 검색 (keyword, take, page 또는 id)
    if (type === 'dic') {
      if (id) {
        return await this.searchService.findOneDic(id);
      }

      if (!id) {
        return await this.searchService.findAndCountDic(take, page, keyword);
      }
    }

    //! 포토사전 검색 (keyword, take, page 또는 id)
    if (type === 'photodic') {
      if (id) {
        return await this.searchService.findOnePhotodic(id);
      }

      if (!id) {
        return await this.searchService.findAndCountPhotodic(
          take,
          page,
          keyword,
        );
      }
    }

    //! 성서 지도 검색 (keyword, take, page 또는 id)
    if (type === 'biblemap') {
      if (id) {
        return await this.searchService.findOneBiblemap(id);
      }

      if (!id) {
        return await this.searchService.findAndCountBiblemap(
          take,
          page,
          keyword,
        );
      }
    }

    //! 주석 검색 (keyword, take, page 또는 id)
    if (type === 'jusuk') {
      if (id) {
        return this.searchService.findOneJusuk(id);
      }

      if (!id) {
        return this.searchService.findAndCountJusuk(take, page, keyword);
      }
    }

    //! 강해 검색 (keyword, take, page 또는 id)
    if (type === 'kanghae') {
      if (id) {
        return this.searchService.findOneKanghae(id);
      }

      if (!id) {
        return this.searchService.findAndCountKanghae(take, page, keyword);
      }
    }
  }

  //! 찬송가 검색 (keyword, take, page 또는 id)
}
