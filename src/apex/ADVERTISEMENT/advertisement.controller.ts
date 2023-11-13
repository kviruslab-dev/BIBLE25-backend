import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ONE_ADVERTISEMENT } from 'src/common/const';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { AdvertisementService } from './advertisement.service';

@ApiTags('ADVERTISEMENT')
@Controller('advertisement')
@UseInterceptors(SuccessInterceptor)
export class AdvertisementController {
  constructor(
    private readonly advertisementService: AdvertisementService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description:
      '타입 : main01, main02, main03, main04, first, last, bible, chansong, malsum, good, today, kido, calum, cross, letter, book, ildok, dic, biblemap, photodic, study, note, muksnag, qna, photo',
  })
  @ApiQuery({ name: 'lat', required: true, type: String })
  @ApiQuery({ name: 'lon', required: true, type: String })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'jang', required: false, type: Number })
  @ApiOperation({ summary: '광고 데이터 가져오기' })
  @Get()
  async getData(
    @Query('type') type: string,
    // @Query('lat') lat: string,
    // @Query('lon') lon: string,
    @Query('take') take?: number,
    @Query('page') page?: number,
    @Query('jang') jang?: number,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // if (!lat || !lon) {
    //   throw new HttpException(
    //     `lat, lon 값을 입력하지 않았습니다.`,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    const lat = '0';
    const lon = '0';

    const pageFromType = await this.advertisementService.getPageFromType(type);

    const { city } = await this.advertisementService.getAddress(lat, lon);

    if (['main01', 'main02', 'main03', 'main04'].includes(type)) {
      const location = { main01: 1, main02: 2, main03: 3, main04: 4 };

      try {
        const condition = {
          select: 'id, location, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and location =${location[type]} and city='${city}' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        //! 데이터가 존재하지 않는 경우, base 광고 반환
        const data = await this.advertisementService.findInMain(condition);

        if (data.length === 0) {
          throw new HttpException(
            `데이터가 존재하지 않습니다.`,
            HttpStatus.BAD_REQUEST,
          );
        }

        return data;
      } catch (error) {
        const condition = {
          select: 'id, location, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and location =${location[type]} and city='base' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.advertisementService.findInMain(condition);
      }
    }

    if (ONE_ADVERTISEMENT.includes(type)) {
      if (type === 'bible') {
        if (!jang) {
          throw new HttpException(
            `jang 값을 입력하지 않았습니다.`,
            HttpStatus.BAD_REQUEST,
          );
        }

        let index: number;
        if (jang < 10) {
          index = jang;
        }

        if (jang >= 10) {
          index = jang % 10;
        }

        try {
          const condition = {
            select: 'id, title, image, link',
            table: 'market',
            where: `title='성경ㅁ${index}장' and city='${city}' and active=1`,
            orderBy: 'id asc',
            limit: '10',
            offset: '0',
          };

          const data = await this.advertisementService.findInBible(condition);

          if (!data[0]) {
            throw new HttpException(
              `데이터가 존재하지 않습니다.`,
              HttpStatus.BAD_REQUEST,
            );
          }

          return data;
        } catch (err) {
          const condition = {
            select: 'id, title, image, link',
            table: 'market',
            where: `title='성경ㅁ${index}장' and city='base' and active=1`,
            orderBy: 'id asc',
            limit: '10',
            offset: '0',
          };

          return await this.advertisementService.findInBible(condition);
        }
      }

      try {
        const condition = {
          select: 'id, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and city='${city}' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        //! 데이터가 존재하지 않는 경우, base 광고 반환
        const data = await this.advertisementService.findInEtc(condition);

        if (data.length === 0) {
          throw new HttpException(
            `데이터가 존재하지 않습니다.`,
            HttpStatus.BAD_REQUEST,
          );
        }

        return data;
      } catch (error) {
        const condition = {
          select: 'id, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and city='base' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.advertisementService.findInEtc(condition);
      }
    }
  }

  @ApiOperation({ summary: '광고 클릭 수 증가시키기 (PATCH 버전)' })
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

    await this.queryRunnerService.updateMySQL(condition);
  }

  @ApiOperation({ summary: '광고 클릭 수 증가시키기 (POST 버전)' })
  @Post()
  async updateTickPostVer(@Body() body: object & { id: number }) {
    if (!body.id) {
      throw new HttpException(
        `id 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const condition = {
      table: 'market',
      set: 'tick=tick+1',
      where: `id=${body.id}`,
    };

    await this.queryRunnerService.updateMySQL(condition);
  }
}
