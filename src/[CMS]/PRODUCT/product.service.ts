import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class ProductService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findAndCount(condition: any) {
    const data01 = await this.queryRunnerService.findAndCount(condition(1));
    const data02 = await this.queryRunnerService.findAndCount(condition(2));

    const total01 = await this.queryRunnerService.getTotal(condition(1));
    const total02 = await this.queryRunnerService.getTotal(condition(2));

    return {
      list: { 1: data01.list, 2: data02.list },
      total: total01 + total02,
    };
  }
}
