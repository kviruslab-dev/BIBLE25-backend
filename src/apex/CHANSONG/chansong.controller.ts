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

  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'take', required: false, type: Number })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'keyword', required: false, type: String })
  @ApiOperation({ summary: '찬송가 가져오기' })
  @Get('song')
  async getSong(
    @Query('id') id: number,
    @Query('take') take: number,
    @Query('page') page: number,
    @Query('keyword') keyword: string,
  ) {
    if (keyword) {
      const condition = {
        select: 'id, title, num, oldnum',
        table: 'sys_hymm',
        where: `title like '%${keyword.trim()}%' or content like '%${keyword.trim()}%'`,
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.chansongService.findAndCount(condition);
    }

    if (id) {
      const condition = {
        select: 'id, title, content, num, oldnum, audio, image',
        table: 'sys_hymm',
        where: `id = ${id}`,
      };

      return await this.chansongService.findOne(condition);
    }

    if (!id) {
      const condition = {
        select: 'id, title, num, oldnum',
        table: 'sys_hymm',
        where: 'TRUE',
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.chansongService.find(condition);
    }
  }

  @ApiQuery({ name: 'id', required: false, type: Number })
  @ApiQuery({ name: 'version', required: false, type: Number })
  @ApiOperation({ summary: '교독문 가져오기' })
  @Get('gyodok')
  async getGyodok(@Query('id') id: number, @Query('version') version: number) {
    if (id) {
      const condition = {
        select: 'id, title, content, together',
        table: 'sys_gyo',
        where: `id = ${id}`,
      };

      return await this.chansongService.findOne(condition);
    }

    if (!id) {
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
        limit: '150',
        offset: 0,
      };

      return await this.chansongService.find(condition);
    }
  }

  @ApiQuery({ name: 'version', required: true, type: Number })
  @ApiOperation({ summary: '주기도문 가져오기' })
  @Get('kido')
  async getKido(@Query('version') version: number) {
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

  @ApiQuery({ name: 'version', required: true, type: Number })
  @ApiOperation({ summary: '사도신경 가져오기' })
  @Get('sado')
  async getSado(@Query('version') version: number) {
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
