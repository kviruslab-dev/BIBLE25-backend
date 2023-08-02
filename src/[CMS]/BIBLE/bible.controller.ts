import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { BibleService } from './bible.service';

@UseInterceptors(SuccessInterceptor)
@Controller('bible')
export class BibleController {
  constructor(
    private readonly bibleService: BibleService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Get()
  async getData(
    @Query('type') type: string,
    @Query('id') id: number,
    @Query('take') take?: number,
    @Query('page') page?: number,
    @Query('keyword') keyword?: string,
    @Query('book') book?: number,
    @Query('jang') jang?: number,
  ) {
    if (!type) {
      throw new HttpException(
        `type 값을 입력하지 않았습니다. ( photodic | biblemap | dic | study | note | muksang | qna | photo | bibleaudio )`,
        HttpStatus.BAD_REQUEST,
      );
    }

    if (type === 'photodic') {
      if (id) {
        const condition = {
          select: 'id, imgidx, title, content',
          table: 'bible_photodic',
          where: `id = ${id}`,
        };

        return await this.bibleService.findOnePhotodic(condition);
      }

      if (!id && keyword) {
        const condition = {
          select: 'id, title',
          table: 'bible_photodic',
          where: `title like '%${keyword.trim()}%'`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }

      if (!id && !keyword) {
        const condition = {
          select: 'id, title',
          table: 'bible_photodic',
          where: `true`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }
    }

    if (type === 'biblemap') {
      if (id) {
        const condition = {
          select: 'id, imgidx, title, content',
          table: 'bible_map',
          where: `id = ${id}`,
        };

        return await this.bibleService.findOneBibleMap(condition);
      }

      if (!id && keyword) {
        const condition = {
          select: 'id, title',
          table: 'bible_map',
          where: `title like '%${keyword.trim()}%'`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }

      if (!id && !keyword) {
        const condition = {
          select: 'id, title',
          table: 'bible_map',
          where: `TRUE`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }
    }

    if (type === 'dic') {
      if (id) {
        const condition = {
          select: 'id, title, content',
          table: 'bible_dic',
          where: `id = ${id}`,
        };

        return await this.queryRunnerService.findOne(condition);
      }

      if (!id && keyword) {
        const condition = {
          select: 'id, title',
          table: 'bible_dic',
          where: `title like '%${keyword.trim()}%'`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }

      if (!id && !keyword) {
        const condition = {
          select: 'id, title',
          table: 'bible_dic',
          where: `TRUE`,
          orderBy: 'id asc',
          limit: String(take ? take : 10),
          offset: String(page ? take * (page - 1) : 0),
        };

        return await this.queryRunnerService.findAndCount(condition);
      }
    }

    if (type === 'study') {
      const codeCondition = {
        select: 'code',
        table: 'deluxe_matt_new',
        where: `book='${book}' and title like '${jang}장'`,
      };

      const { code } = await this.queryRunnerService.findOne(codeCondition);

      const condition = {
        select: 'id, title, content',
        table: 'deluxe_matt_new',
        where: `book=${book} and code like '${code}%' and code != '${code}'`,
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'note') {
      const condition = {
        select: 'id, title, content',
        table: 'bible_note',
        where: `book=${book} and jang=${jang}`,
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'muksang') {
      const condition = {
        select: 'id, bible, title, content',
        table: 'bible_muk',
        where: `book=${book} and jang=${jang}`,
        orderBy: 'id asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'qna') {
      const condition = {
        select: 'id, bible, content',
        table: 'bible_qna',
        where: `book=${book} and jang=${jang}`,
        orderBy: 'jul asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'photo') {
      const condition = {
        select: 'id, content, image',
        table: 'bible_pho',
        where: `book=${book} and jang=${jang}`,
        orderBy: 'jul asc',
        limit: String(take ? take : 10),
        offset: String(page ? take * (page - 1) : 0),
      };

      return await this.bibleService.findAndCountPhoto(condition);
    }

    if (type === 'bibleaudio') {
      const condition = {
        select: 'id, book, jang, name',
        table: 'sys_bible_mp',
        where: `book = '${book}' and jang = '${jang}'`,
      };

      return await this.bibleService.findOneBibleAudio(condition);
    }
  }
}
