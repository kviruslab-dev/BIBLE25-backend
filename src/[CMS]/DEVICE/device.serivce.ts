import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { DeviceIdDto } from './dtos/deviceId.dto';
import { fcmpushAllDto, fcmpushDto } from './dtos/fcmpush.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async sendFcmpush(data: fcmpushDto) {
    const Key = process.env.FIREBASE_FCM_SERVER_KEY;
    const condition = {
      select: 'id, deviceId, pushyn',
      table: 'device_info',
      where: `deviceId = '${data.deviceId}' and pushyn = 1`,
    };

    const deviceInfo = await this.queryRunnerService.findOne(condition);

    if (deviceInfo) {
      axios
        .post(
          `https://fcm.googleapis.com/fcm/send`,
          {
            to: data.deviceId,
            notification: {
              title: data.title,
              body: data.content,
            },
          },
          {
            headers: {
              Authorization: 'key=' + Key,
            },
          },
        )
        .then((d) => console.log('firebaseFCMPush 성공'))
        .catch((err) => console.log(err));
    }

    return { code: 1000, message: 'complete', time: Date() };
  }

  async sendFcmpushAll(data: fcmpushAllDto) {
    const Key = process.env.FIREBASE_FCM_SERVER_KEY;

    const condition = {
      select: 'deviceId',
      table: 'device_info',
      where: `pushyn = 1`,
      orderBy: 'create_at DESC',
      limit: 100000000,
      offset: 0,
    };

    const { list, total } = await this.queryRunnerService.findAndCount(
      condition,
    );

    const refinedList = list.map((i: object) => i['deviceId']);
    const num = Math.floor(total / 1000) + 1;

    for (let i = 0; i < num; i++) {
      axios
        .post(
          `https://fcm.googleapis.com/fcm/send`,
          {
            registration_ids:
              i === num - 1
                ? refinedList.slice(i * 1000)
                : refinedList.slice(i * 1000, (i + 1) * 1000),
            notification: {
              title: data.title,
              body: data.content,
            },
          },
          {
            headers: {
              Authorization: 'key=' + Key,
            },
          },
        )
        .then((d) => console.log('Firebase FCM 푸시 성공'))
        .catch((err) => console.log(err));
    }

    return;
  }

  async setDeviceId(data: DeviceIdDto) {
    const address = await this.getCityDong(
      data.lat ?? '1.2',
      data.lon ?? '3.4',
    );

    const condition = {
      select: 'id, deviceId',
      table: 'device_info',
      where: `deviceId = '${data.deviceId}'`,
    };

    const deviceInfo = await this.queryRunnerService.findOne(condition);

    if (!deviceInfo) {
      const condition = {
        table: 'device_info',
        columns: `deviceId, city, lat, lon, timezone, country, pushyn`,
        values: `'${data.deviceId}', '${address.city}','${data.lat}', 
        '${data.lon}', '${address.timezone}', '${address.country}', 
        ${data.pushyn ?? 1}`,
      };

      await this.queryRunnerService.insert(condition);
    }

    if (deviceInfo) {
      const condition = {
        table: 'device_info',
        set: `
        deviceId = '${data.deviceId}', city = '${address.city}', 
        lat = '${data.lat}',  lon = '${data.lon}',
        timezone = '${address.timezone}', country = '${address.country}', 
        pushyn = ${data.pushyn ?? 1}
        `,
        where: `deviceId = '${data.deviceId}'`,
      };

      await this.queryRunnerService.updateMySQL(condition);
    }
  }

  async getAll(take: number, page: number) {
    const condition = {
      select: 'id, deviceId, pushyn',
      table: `device_info`,
      where: 'TRUE',
      orderBy: 'id DESC',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    return await this.queryRunnerService.findAndCount(condition);
  }

  //! 위도, 경도를 통해 주소 정보를 반환하는 함수
  async getCityDong(lat: string, lon: string) {
    const url = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lon}&y=${lat}&input_coord=WGS84`;

    const axiosResult = await axios({
      url,
      method: 'get',
      headers: {
        Authorization: `KakaoAK ${process.env.KAKAO_CLIENT_ID}`,
      },
    });

    const doci =
      axiosResult.data.documents[0]?.address?.region_1depth_name ?? 'ETC';
    const city =
      axiosResult.data.documents[0]?.address?.region_2depth_name ?? 'base';
    const country = doci === 'ETC' && city === 'base' ? 'base' : 'KR';

    return {
      timezone: doci,
      country,
      city,
    };
  }
}
