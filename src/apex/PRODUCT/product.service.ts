import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class ProductService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async find(condition: any) {
    const temp01 = await this.queryRunnerService.findAndCount(condition(1));
    const temp02 = await this.queryRunnerService.findAndCount(condition(2));

    const data01 = temp01.list.map((v: any) => {
      v.money = v.money.toLocaleString('ko-KR');
      v.dc += '%할인';
      return v;
    });

    const data02 = temp02.list.map((v: any, i: number) => {
      if (i < 4) {
        v.money = v.money.toLocaleString('ko-KR');
        v.dc += '%할인';
        return v;
      }

      v.money = `월 ${v.money.toLocaleString('ko-KR')}`;
      // v.money = ` ${v.money.toLocaleString('ko-KR')}`;
      v.dc += '개월';
      return v;
    });

    return { 1: data01, 2: data02 };
  }
}
