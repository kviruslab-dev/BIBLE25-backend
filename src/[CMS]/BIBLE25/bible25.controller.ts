import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { bible25Interceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { Bible25Service } from './bible25.service';

@ApiTags('BIBLE')
@Controller('bible25')
@UseInterceptors(bible25Interceptor)
export class Bible25Controller {
  constructor(
    private readonly bible25Service: Bible25Service,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Get('study')
  async getStudy(@Query('book') book?: number, @Query('jang') jang?: number) {
    return await this.bible25Service.getStudy(book, jang);
  }

  @Get('note')
  async getNote(@Query('book') book?: number, @Query('jang') jang?: number) {
    return await this.bible25Service.getNote(book, jang);
  }

  @Get('muksang')
  async getMuksang(@Query('book') book?: number, @Query('jang') jang?: number) {
    return await this.bible25Service.getMuksang(book, jang);
  }

  @Get('qna')
  async getQNA(@Query('book') book?: number, @Query('jang') jang?: number) {
    return await this.bible25Service.getQNA(book, jang);
  }

  @Get('photo')
  async getPhoto(@Query('book') book?: number, @Query('jang') jang?: number) {
    return await this.bible25Service.getPhoto(book, jang);
  }

  @Get('audio')
  async getAudio(@Query('book') book?: number, @Query('jang') jang?: number) {
    return await this.bible25Service.getAudio(book, jang);
  }
}
