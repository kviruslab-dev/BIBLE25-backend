import { Injectable } from '@nestjs/common';
import { CHANSONG_URL } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class ChansongService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findAndCount(condition: any) {
    const data = await this.queryRunnerService.findAndCount(condition);
    return data;
  }

  async find(condition: any) {
    const data = await this.queryRunnerService.findAndCount(condition);
    return data.list;
  }

  async findOne(condition: any) {
    const data = await this.queryRunnerService.findOne(condition);

    if (condition.table === 'sys_hymm') {
      data.mraudio = CHANSONG_URL + 'audio_mr/' + data.audio;
      data.audio = CHANSONG_URL + 'audio/' + data.audio;
      data.image = CHANSONG_URL + 'image/' + data.image;

      return data;
    }

    return data;
  }
}
