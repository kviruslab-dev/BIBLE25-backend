import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KAKAO_URL } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class AdvertisementService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async getAddress(lat: string, lon: string) {
    const url = KAKAO_URL + `?x=${lon}&y=${lat}&input_coord=WGS84`;

    const axiosResult = await axios({
      url: url,
      method: 'get',
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
      },
    });

    const si =
      axiosResult.data.documents[0]?.address?.region_1depth_name ?? 'ETC';
    const gu =
      axiosResult.data.documents[0]?.address?.region_2depth_name ?? 'unknown';
    const country = si === 'ETC' && gu === 'unknown' ? 'unknown' : 'KR';

    return {
      timezone: si,
      country,
      city: gu,
    };
  }

  async getPageFromType(type: string) {
    const condition = {
      select: 'page',
      table: 'market_page',
      where: `name='${type}'`,
    };

    const data = await this.queryRunnerService.findOne(condition);
    return data.page;
  }

  async findAndCountInMain(condition: any) {
    const data = await this.queryRunnerService.findAndCount(condition);
    const total = data.total;

    return { list: this.groupByLocation(data.list), total };
  }

  groupByLocation(inputArray: any) {
    const groups = [];

    inputArray.forEach((obj: any) => {
      const location = obj.location - 1;
      if (!groups[location]) {
        groups[location] = [];
      }
      groups[location].push(obj);
    });

    return groups;
  }

  async findOneInBible(condition: any, jang: number) {
    const data = await this.queryRunnerService.findAndCount(condition);
    const index = jang % 10;

    return data.list[index];
  }
}
