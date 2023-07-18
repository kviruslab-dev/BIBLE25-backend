import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class TodayService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findAndCountInMainContents(condition: any) {
    if (typeof condition == 'object') {
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

    if (typeof condition === 'function') {
      const data = [];

      for (let gubun = 1; gubun < 7; gubun++) {
        const temp = await this.queryRunnerService.findAndCount(
          condition(gubun),
        );
        data[data.length] = temp.list[0];
      }
      const total = data.length;

      if (total < 6) {
        throw new HttpException(
          `조건을 만족하는 데이터가 6개 미만입니다.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      return { list: data, total };
    }
  }

  async findAndCountInMainImages(condition: any) {
    const crossData = await this.queryRunnerService.findAndCount(condition(7));
    const letterData = await this.queryRunnerService.findAndCount(condition(8));
    const total = crossData.total + letterData.total;

    if (total < 6) {
      throw new HttpException(
        `조건을 만족하는 데이터가 6개 미만입니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return {
      list: { cross: crossData.list, letter: letterData.list },
      total: crossData.total + letterData.total,
    };
  }

  async findOneInActive(condition: any) {
    const data = await this.queryRunnerService.findAndCount(condition);
    return data.list[0];
  }

  getToday() {
    const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (1 + date.getMonth())).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return year + '-' + month + '-' + day;
  }
}
