import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { ChansongService } from './chansong.service';

@ApiTags('CHANSONG')
@Controller('chansong')
@UseInterceptors(SuccessInterceptor)
export class ChansongController {
  constructor(private readonly chansongService: ChansongService) {}

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description: '타입 : song, gyodok, kido, sado',
  })
  @ApiQuery({ name: 'id', required: false, type: String })
  @ApiQuery({ name: 'take', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: String })
  @ApiQuery({ name: 'version', required: false, type: String })
  @ApiOperation({ summary: '찬송가 관련 데이터 가져오기' })
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
        `type 값을 입력하지 않았습니다.`,
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

    if (type === 'kido') {
      if (!version) {
        throw new HttpException(
          `version 값을 입력하지 않았습니다. ( 1 : 2 )`,
          HttpStatus.BAD_REQUEST,
        );
      }
      const condition = {
        select: 'content',
        table: 'sys_kido',
        where: `version = ${version}`,
      };

      return await this.chansongService.findOne(condition);
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
}
