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
    const typeToHangul = {
      main01: '메인',
      main02: '메인',
      main03: '메인',
      main04: '메인',
      first: '첫화면',
      last: '마지막종료',
      bible: '성경',
      chansong: '찬송',
      malsum: '말씀따라',
      good: '굿모닝하나님',
      today: '오늘의말씀',
      kido: '축복기도',
      calum: '칼럼',
      cross: '십자가',
      letter: '손편지',
      book: '오늘의책',
      ildok: '성경일독',
      dic: '성경사전',
      biblemap: '성서지도',
      photodic: '포토성경사전',
      study: '스터디',
      note: '핵심',
      muksnag: '묵상',
      qna: 'QA',
      photo: '포토',
    };

    const hansulName = typeToHangul[type];

    const condition = {
      select: 'page',
      table: 'market_page',
      where: `name='${hansulName}'`,
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

  async findAndCountInBible(condition: any, jang: number) {
    const data = await this.queryRunnerService.findAndCount(condition);

    if (jang <= 10) {
      const index = jang - 1;
      return { list: [data.list[index]], total: 1 };
    }

    if (jang > 10) {
      const index = (jang % 10) - 1;
      return { list: [data.list[index]], total: 1 };
    }
  }
}
