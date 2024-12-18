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
      '타입 : main01, main02, main03, main04, main05, main06, main07, main08,main09, first, last, bible, chansong, malsum, good, today, kido, calum, cross, letter, book, iyagi, ildok, dic, biblemap, photodic, study, note, muksnag, qna, photo, iyagishare, push',
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

    if (type === '_next') {
      console.log('type:', type, 'take:', take, 'page:', page, 'jang:', jang);
      return;
    }

    const lat = '0';
    const lon = '0';

    //! 이야기메시지는 축복기도와 동일한 광고를 보여줍니다.
    const pageFromType = await this.advertisementService.getPageFromType(type);

    const { city } = await this.advertisementService.getAddress(lat, lon);

    if (
      [
        'main01',
        'main02',
        'main03',
        'main04',
        'main05',
        'main06',
        'main07',
        'main08',
        'main09',
      ].includes(type)
    ) {
      const location = {
        main01: 1,
        main02: 2,
        main03: 3,
        main04: 4,
        main05: 5,
        main06: 6,
        main07: 7,
        main08: 8,
        main09: 9,
      };

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

      if (type === 'iyagishare') {
        const condition = {
          select: 'id, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and city='공유' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        const data = await this.advertisementService.findInEtc(condition);
        data[0].title = '이야기메시지공유';

        return data;
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

        if (type === 'first') {
          // const condition = {
          //   table: 'market',
          //   set: 'showyn=showyn+1',
          //   where: `id=811`,
          // };
          //
          // await this.queryRunnerService.updateMySQL(condition);
          return data;
        }
        if (type === 'last') {
          return data;
        }

        //! 이야기메시지인 경우, title 값을 "축복기도"에서 "이야기메시지"로 변경합니다.
        if (type === 'iyagi') {
          data[0].title = '이야기메시지';
        }

        const randomIndex = Math.floor(Math.random() * data.length);
        return [data[randomIndex]];
      } catch (error) {
        const condition = {
          select: 'id, title, image, link',
          table: 'market',
          where: `page=${pageFromType} and city='base' and active=1`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        const data = await this.advertisementService.findInEtc(condition);
        //! 이야기메시지인 경우, title 값을 "축복기도"에서 "이야기메시지"로 변경합니다.
        if (type === 'iyagi') {
          data[0].title = '이야기메시지';
        }
        const randomIndex = Math.floor(Math.random() * data.length);
        return [data[randomIndex]];
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

  //! 선택 광고(id) 뷰, 클릭수 일별 집계
  // @Cron('0 59 23 * * *')
  async todayTick() {
    if (process.env.MODE === 'production') {
      return;
    }

    if (process.env.MODE === 'development') {
      try {
        const condition = {
          select: 'tick, showyn',
          table: 'market',
          where: 'id=811',
        };
        const data = await this.queryRunnerService.findOne(condition);

        const condition2 = {
          table: 'todayTick',
          columns: ['tick', 'showyn'],
          values: [data.tick, data.showyn],
        };

        await this.queryRunnerService.insert(condition2);

        const condition3 = {
          table: 'market',
          set: 'tick=0, showyn=0',
          where: `id=811`,
        };

        await this.queryRunnerService.updateMySQL(condition3);
      } catch (error) {
        console.log(error);
      }
    }
  }
}
