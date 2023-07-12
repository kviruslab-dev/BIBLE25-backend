import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AdvertisementService } from './advertisement.service';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@UseInterceptors(SuccessInterceptor)
@Controller('advertisement')
export class AdvertisementController {
  constructor(
    private readonly queryRunnerService: QueryRunnerService,
    private readonly advertisementService: AdvertisementService,
  ) {}

  @Get()
  async getData(
    @Query('type') type: string,
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('location') location: number,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다. ( 메인 | 첫화면 | 마지막종료 | 성경 | 찬송 | 말씀따라 | 굿모닝하나님 | 오늘의말씀 | 축복기도 | 칼럼 | 십자가 | 손편지 | 오늘의책 | 성경일독 | 성경사전 | 성서지도 | 포토성경사전 | 스터디 | 핵심 | 묵상 | QA | 포토 )`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const { timezone, city } = await this.advertisementService.getAddress(
      lat,
      lon,
    );

    const pageFromType = 1;

    const condition = {
      select: 'id, title, image, link',
      table: 'market',
      where: `page=${pageFromType} and timezone='${timezone}' and city='${city}' and active=1`,
      orderBy: 'id asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    try {
      return await this.queryRunnerService.findAndCount(condition);
    } catch (error) {
      const condition = {
        select: 'id, title, image, link',
        table: 'market',
        where: `page=${pageFromType} and city='base' and active=1`,
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }
  }
}
