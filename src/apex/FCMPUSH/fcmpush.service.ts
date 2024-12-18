import { Injectable } from '@nestjs/common';
import { saveErrorLog } from 'src/common/utils/saveErrorLog';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class FcmPushService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async setDeviceID(body: any) {
    const condition = {
      select: 'deviceId, city, lat, lon, timezone, country, pushyn',
      table: 'device_info',
      where: `deviceId = '${body.deviceId}'`,
    };
    const data = await this.queryRunnerService.findOne(condition);
    const address = await this.getCityDong(
      body.lat ?? '1.2',
      body.lon ?? '3.4',
    );
    if (!data) {
      const condition = {
        table: 'device_info',
        columns: 'deviceId, city, lat, lon, timezone, country, pushyn',
        values: `'${body.deviceId}', '${address.city}', '${body.lat}', '${body.lon}', '${address.timezone}', '${address.country}', 1`,
      };

      try {
        await this.queryRunnerService.insert(condition);
      } catch (err) {
        //! 오류 로그 저장
        saveErrorLog(
          0,
          'POST',
          'fcmpush/deviceid',
          '{}',
          JSON.stringify(body),
          String(err),
        );

        return { code: 1000, message: 'complete', time: Date() };
      }
    }

    //! 지역 광고 기획 (사용자의 현재 위도, 경도 정보를 DB에 최신화 시키기)
    // if (data) {
    //   const condition = {
    //     table: 'device_info',
    //     set: `
    //       city='${address.city}', lat='${body.lat ?? data.lat}', lon='${
    //       body.lon ?? data.lon
    //     }', timezone='${address.timezone}', country='${
    //       address.country
    //     }', pushyn='${body.pushyn ?? data.pushyn}'
    //     `,
    //     where: `deviceId='${body.deviceId}'`,
    //   };

    //   try {
    //     await this.queryRunnerService.updateMySQL(condition);
    //   } catch (err) {
    //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
    //     // null;
    //   }
    // }

    return { code: 1000, message: 'complete', time: Date() };
  }

  async getCityDong(lat: string, lon: string) {
    // const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`;

    // const axiosResult = await axios({
    //   url,
    //   method: 'get',
    //   headers: {
    //     Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
    //   },
    // });

    // const doci =
    //   axiosResult.data.documents[0]?.address?.region_1depth_name ?? 'ETC';
    // const city =
    //   axiosResult.data.documents[0]?.address?.region_2depth_name ?? 'base';
    // const country = doci === 'ETC' && city === 'base' ? 'base' : 'KR';

    // return {
    //   timezone: doci,
    //   country,
    //   city,
    // };

    return {
      timezone: 'ETC',
      country: 'KR',
      city: 'base',
    };
  }
}
