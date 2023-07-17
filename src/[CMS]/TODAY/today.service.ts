import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CHANSONG_URL } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class TodayService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async getGubunFromType(type: string) {
    const typeList = [
      'malsum',
      'good',
      'kido',
      'calum',
      'today',
      'book',
      'cross',
      'letter',
    ];

    return typeList.indexOf(type);
  }

  async findAndCountInMainContent(condition: any) {
    if (condition.limit === 1) {
      const today = new Date();
      const data = [];

      for (let gubun = 1; gubun < 7; gubun++) {
        const condition = {
          select:
            'id, SUBSTRING(content, 1, 40) as content, name, title, image',
          table: 'today_content',
          where: `gubun=${gubun} and today<=${today}`,
          orderBy: 'today desc',
          limit: 1,
          offset: 0,
        };

        data[data.length] = await this.queryRunnerService.findOne(condition);
      }

      return data;
    }

    if (condition.limit > 1) {
      const data = await this.queryRunnerService.findAndCount(condition);
      const total = data.total;

      if (total < 6) {
        throw new HttpException(
          `활성화 상태의 데이터가 6개 미만입니다.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return { list: data, total };
    }
  }

  getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  }
}
