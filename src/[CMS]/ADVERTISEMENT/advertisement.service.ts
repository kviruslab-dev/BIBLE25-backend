import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { KAKAO_URL } from 'src/common/const';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class AdvertisementService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async findAndCount(condition: any) {
    return await this.queryRunnerService.findAndCount(condition);
  }

  async findOne(condition: any) {
    return await this.queryRunnerService.findOne(condition);
  }

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
}
