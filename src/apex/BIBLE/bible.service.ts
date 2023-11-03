import { Injectable } from '@nestjs/common';
import {
  BIBLE_AUDIO_URL,
  BIBLE_MAP_URL,
  BIBLE_PHOTODIC_URL,
  BIBLE_PHOTO_URL,
} from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class BibleService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findOnePhotodic(condition: any) {
    const data = await this.queryRunnerService.findOne(condition);

    const conditionToGetImage = {
      select: 'title, image',
      table: 'img_info',
      where: `image_gubun = 'photo_bible_dic' and imgidx = ${data.imgidx}`,
      orderBy: 'id asc',
      limit: 10,
      offset: 0,
    };

    const { list } = await this.queryRunnerService.findAndCount(
      conditionToGetImage,
    );

    data['image'] = list.map((val: any) => {
      val.title = val.title.substring(0, val.title.length - 4);
      val.image = BIBLE_PHOTODIC_URL + val.image;
      return val;
    });

    const { imgidx, ...newData } = data;

    return newData;
  }

  async findOneBibleMap(condition: any) {
    const data = await this.queryRunnerService.findOne(condition);

    const conditionToGetImage = {
      select: 'title, image',
      table: 'img_info',
      where: `image_gubun = 'bible_map' and imgidx = ${data.imgidx}`,
      orderBy: 'id asc',
      limit: 10,
      offset: 0,
    };

    const { list } = await this.queryRunnerService.findAndCount(
      conditionToGetImage,
    );

    data['image'] = list.map((val: any) => {
      val.title = val.title.substring(0, val.title.length - 4);
      val.image = BIBLE_MAP_URL + val.image;
      return val;
    });

    const { imgidx, ...newData } = data;

    return newData;
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

  async findOneBibleAudio(condition: any) {
    const data = await this.queryRunnerService.findOne(condition);

    data.name = BIBLE_AUDIO_URL + data.name;

    return data;
  }
}
