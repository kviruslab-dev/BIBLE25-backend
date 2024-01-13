import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class TodayService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findInMainContents(condition: any) {
    if (typeof condition == 'object') {
      const data = await this.queryRunnerService.findAndCount(condition);
      const total = data.total;

      if (total < 6) {
        throw new HttpException(
          `활성화 상태의 데이터가 6개 미만입니다.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      //! 축복기도 이름으로 들어온 데이터를 이야기메시지로 변경합니다. (2024.01.01 이후 적용)
      data.list[2].name = '이야기메시지';

      //! 칼럼 name 값이 빈값으로 들어오는 경우가 존재합니다. (C#으로 만든 어드민으로 예상)
      //! name 값이 비어있는 경우, 메인화면에 칼럼 미리보기가 그려지지 않기에 로직을 추가합니다.
      data.list[3].name = '칼럼';

      // //! 오늘의 말씀을 톨레레게로 (바이블25 부사장님 요청. 230109)
      data.list[4].name = '톨레레게';

      return data;
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

      return data;
    }
  }

  async findInMainImages(condition: any) {
    const crossData = await this.queryRunnerService.findAndCount(condition(7));
    const letterData = await this.queryRunnerService.findAndCount(condition(8));
    const total = crossData.total + letterData.total;

    if (total < 6) {
      throw new HttpException(
        `조건을 만족하는 데이터가 6개 미만입니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    return { cross: crossData.list, letter: letterData.list };
  }

  async findOneInActive(condition: any) {
    const data = await this.queryRunnerService.findAndCount(condition);
    return data.list[0];
  }
}
