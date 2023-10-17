import { Injectable } from '@nestjs/common';
import { ADMIN_TYPE_OBJECT } from 'src/common/const';
import { arrayToFormattedString } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class AdminService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findAndCount(type: string) {
    const marketType = ['main', 'bible', 'hymm', 'todays', 'lab', 'etc'];
    const pageString = arrayToFormattedString(ADMIN_TYPE_OBJECT[type]);

    if (marketType.includes(type)) {
      const condition = {
        select:
          'id, create_at, title, tick, start_date, end_date, page, location, rate, image, link, active, city, rate',
        table: 'market',
        where: `page in ${pageString}`,
        orderBy: 'id asc',
        limit: String(1000),
        offset: String(0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'product') {
      const condition = {
        select:
          'id, create_at, gubun, tick, title, money, star, dc, image, link, sequence, active',
        table: 'market_item',
        where: `TRUE`,
        orderBy: 'id asc',
        limit: String(1000),
        offset: String(0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }

    if (type === 'donate') {
      const condition = {
        select: 'id, create_at, title, image, link, type',
        table: 'board',
        where: `TRUE`,
        orderBy: 'id asc',
        limit: String(1000),
        offset: String(0),
      };

      return await this.queryRunnerService.findAndCount(condition);
    }
  }

  // async update(data: UpdateDto) {
  //   if (data.columns.includes('tick')) {
  //     return 0;
  //   }

  //   const cantUpdate = ['id', 'create_at', 'tick'];

  //   const isAvailable = cantUpdate.some((i) => data.columns.includes(i));

  //   const setQuery = formatKeyValuePairs(data.columns, data.values);
  //   const idString = arrayToFormattedString(data.id);

  //   const conditionForUpdate = {
  //     table: 'market',
  //     set: setQuery,
  //     where: `id in ${idString}`,
  //   };

  //   return await this.queryRunnerService.updateMySQL(conditionForUpdate);
  // }
}
