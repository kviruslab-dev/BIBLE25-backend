import { Injectable } from '@nestjs/common';
import { BIBLE_AUDIO_URL, BIBLE_PHOTO_URL } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class Bible25Service {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async getStudy(book: number, jang: number) {
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
      limit: String(1000),
      offset: String(0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async getNote(book: number, jang: number) {
    const condition = {
      select: 'id, bible, content',
      table: 'bible_note',
      where: `book=${book} and jang=${jang}`,
      orderBy: 'id asc',
      limit: String(1000),
      offset: String(0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async getMuksang(book: number, jang: number) {
    const condition = {
      select: 'id, bible, title, content',
      table: 'bible_muk',
      where: `book=${book} and jang=${jang}`,
      orderBy: 'id asc',
      limit: String(1000),
      offset: String(0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async getQNA(book: number, jang: number) {
    const condition = {
      select: 'id, bible, content',
      table: 'bible_qna',
      where: `book=${book} and jang=${jang}`,
      orderBy: 'jul asc',
      limit: String(1000),
      offset: String(0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  async getPhoto(book: number, jang: number) {
    const condition = {
      select: 'id, content, image',
      table: 'bible_pho',
      where: `book=${book} and jang=${jang}`,
      orderBy: 'jul asc',
      limit: String(1000),
      offset: String(0),
    };

    return await this.findAndCountPhoto(condition);
  }

  async findAndCountPhoto(condition: any) {
    const { list, total } = await this.queryRunnerService.findAndCount(
      condition,
    );

    if (total === 0) {
      return {
        id: -1,
        content: '\n',
        image:
          'https://ch2ho.bible25.co.kr/kviruslab/intellectual/biblephoto/default.png',
      };
    }

    list.map((val: any) => {
      val.image = BIBLE_PHOTO_URL + val.image;
    });

    return { list, total };
  }

  async getAudio(book: number, jang: number) {
    const condition = {
      select: 'id, book, jang, name',
      table: 'sys_bible_mp',
      where: `book = '${book}' and jang = '${jang}'`,
    };

    const data = await this.queryRunnerService.findOne(condition);
    data.name = BIBLE_AUDIO_URL + data.name;

    return { list: data };
  }
}
