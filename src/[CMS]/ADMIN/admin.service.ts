import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ADMIN_TYPE_OBJECT } from 'src/common/const';
import {
  arrayToFormattedString,
  formatKeyValuePairs,
  stringToArray,
} from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { UpdateDto } from '../ADVERTISEMENT/dtos/update.dto';
import * as fs from 'fs';

@Injectable()
export class AdminService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findAndCount(type: string) {
    const marketType = ['main', 'bible', 'hymm', 'todays', 'lab', 'etc'];
    const pageString = arrayToFormattedString(ADMIN_TYPE_OBJECT[type]);

    if (marketType.includes(type)) {
      const condition = {
        select:
          'id, create_at, title, tick, start_date, end_date, page, location, rate, image, link, active, city, timezone',
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

  async update(data: UpdateDto) {
    const marketType = ['main', 'bible', 'hymm', 'todays', 'lab', 'etc'];

    if (marketType.includes(data.type)) {
      if (data.columns.includes('id, tick, create_at')) {
        throw new HttpException(
          `업데이트 할 수 없는 정보입니다.`,
          HttpStatus.BAD_REQUEST,
        );
      }

      const setQuery = formatKeyValuePairs(data.columns, data.values);
      const idString = arrayToFormattedString(data.id);

      const conditionForUpdate = {
        table: 'market',
        set: setQuery,
        where: `id in ${idString}`,
      };

      return await this.queryRunnerService.updateMySQL(conditionForUpdate);
    }

    if (data.columns.includes('id, tick')) {
      return 0;
    }
  }

  async getLocal(type: string | undefined) {
    const typeArr = stringToArray(type);

    const cities = fs.readFileSync('src/common/json/cities.json', 'utf8');
    const citiesJson = JSON.parse(cities);

    if (type === undefined) {
      return Object.keys(citiesJson);
    }

    function getNeighbourhoods(locationArray: string[]) {
      if (!Array.isArray(locationArray) || locationArray.length === 0) {
        throw new Error('Please provide a valid location array.');
      }

      let currentData = citiesJson;
      for (const loc of locationArray) {
        currentData = currentData[loc];
        if (!currentData) {
          throw new Error(`${loc} not found.`);
        }
      }

      return currentData;
    }

    function isArray(data) {
      return Array.isArray(data);
    }

    if (!isArray(getNeighbourhoods(typeArr))) {
      return Object.keys(getNeighbourhoods(typeArr));
    } else {
      return getNeighbourhoods(typeArr);
    }
  }
}
