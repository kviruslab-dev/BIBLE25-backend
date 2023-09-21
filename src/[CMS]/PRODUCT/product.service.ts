import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class ProductService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async find(condition: any) {
    const data01 = await this.queryRunnerService.findAndCount(condition(1));
    const data02 = await this.queryRunnerService.findAndCount(condition(2));

    return { 1: data01.list, 2: data02.list };
  }
}
