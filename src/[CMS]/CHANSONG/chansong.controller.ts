import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ChansongService } from './chansong.service';

@UseInterceptors(SuccessInterceptor)
@Controller('chansong')
export class ChansongController {
  constructor(private readonly chansongService: ChansongService) {}

  @Get()
  async getData(
    @Query('type') type: string,
    @Query('id') id: number,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('version') version: number,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다. ( song | gyodok | kido | sado )`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type === 'song' && id) {
      const condition = {
        select: 'id, title, content, num, oldnum, audio, image',
        table: 'sys_hymm',
        where: `id = ${id}`,
      };

      return await this.chansongService.findOne(condition);
    }

    if (type === 'song' && !id) {
      const condition = {
        select: 'id, title, num, oldnum, audio',
        table: 'sys_hymm',
        where: 'TRUE',
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.chansongService.findAndCount(condition);
    }

    if (type === 'gyodok' && id) {
      const condition = {
        select: 'id, title, content, together',
        table: 'sys_gyo',
        where: `id = ${id}`,
      };

      return await this.chansongService.findOne(condition);
    }

    if (type === 'gyodok' && !id) {
      if (!version) {
        throw new HttpException(
          `version 값을 입력하지 않았습니다. ( 1 : 2 )`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const condition = {
        select: 'id, title',
        table: 'sys_gyo',
        where: `version = ${version}`,
        orderBy: 'gyoidx asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.chansongService.findAndCount(condition);
    }

    if (type === 'sado') {
      if (!version) {
        throw new HttpException(
          `version 값을 입력하지 않았습니다. ( 1 : 2 )`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const condition = {
        select: 'content',
        table: 'sys_sado',
        where: `version = ${version}`,
      };

      return await this.chansongService.findOne(condition);
    }
  }

  // TODO [GET] hymm/category
  // TODO [POST] hymm/list
}
