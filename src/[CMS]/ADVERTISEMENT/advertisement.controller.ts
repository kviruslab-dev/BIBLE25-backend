import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { AdvertisementService } from './advertisement.service';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ONE_ADVERTISEMENT } from 'src/common/const';

@UseInterceptors(SuccessInterceptor)
@Controller('advertisement')
export class AdvertisementController {
  constructor(
    private readonly advertisementService: AdvertisementService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Get()
  async getData(
    @Query('type') type: string,
    @Query('lat') lat: string,
    @Query('lon') lon: string,
    @Query('jang') jang: number,
    @Query('take') take?: number,
    @Query('page') page?: number,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다. ( 메인 | 첫화면 | 마지막종료 | 성경 | 찬송 | 말씀따라 | 굿모닝하나님 | 오늘의말씀 | 축복기도 | 칼럼 | 십자가 | 손편지 | 오늘의책 | 성경일독 | 성경사전 | 성서지도 | 포토성경사전 | 스터디 | 핵심 | 묵상 | QA | 포토 )`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!lat || !lon) {
      throw new HttpException(
        `lat, lon 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const pageFromType = await this.advertisementService.getPageFromType(type);

    const { timezone, city } = await this.advertisementService.getAddress(
      lat,
      lon,
    );

    if (type === '메인') {
      try {
        const condition = {
          select: 'id, location, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and timezone='${timezone}' and city='${city}' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.advertisementService.findAndCountInMain(condition);
      } catch (error) {
        const condition = {
          select: 'id, location, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and city='base' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.advertisementService.findAndCountInMain(condition);
      }
    }

    if (ONE_ADVERTISEMENT.includes(type)) {
      if (type === '성경') {
        if (!jang) {
          throw new HttpException(
            `jang 값을 입력하지 않았습니다.`,
            HttpStatus.BAD_REQUEST,
          );
        }
        try {
          const condition = {
            select: 'id, title, image, link',
            table: 'market',
            where: `page=${pageFromType} and timezone='${timezone}' and city='${city}' and active=1`,
            orderBy: 'id asc',
            limit: String(take ? take : 10),
            offset: String(page ? take * (page - 1) : 0),
          };

          return await this.advertisementService.findOneInBible(
            condition,
            jang,
          );
        } catch (err) {
          const condition = {
            select: 'id, title, image, link',
            table: 'market',
            where: `page=${pageFromType} and city='base' and active=1`,
          };

          return await this.advertisementService.findOneInBible(
            condition,
            jang,
          );
        }
      }

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

  @Patch()
  async updateTick(@Query('id') id: number) {
    if (!id) {
      throw new HttpException(
        `id 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const condition = {
      table: 'market',
      set: 'tick=tick+1',
      where: `id=${id}`,
    };

    await this.queryRunnerService.update(condition);
  }
}
