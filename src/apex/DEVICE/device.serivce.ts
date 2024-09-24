import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs';
import { google } from 'googleapis';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { DeviceIdDto } from './dtos/deviceId.dto';
import { fcmpushAllDto, fcmpushDto } from './dtos/fcmpush.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  private readonly logger = new Logger(DeviceService.name);

  private async getAccessToken() {
    return new Promise((resolve, reject) => {
      try {
        const key = require('./dtos/bible25-237705-firebase-adminsdk-6r1i9-3759aff0fe.json'); // 서비스 계정 JSON 파일 불러오기

        const SCOPES = ['https://www.googleapis.com/auth/cloud-platform']; // SCOPES 설정

        const jwtClient = new google.auth.JWT(
          key.client_email,
          null,
          key.private_key,
          SCOPES,
          null,
        );

        // JWT를 사용해 Access Token 얻기
        jwtClient.authorize((err, tokens) => {
          if (err) {
            reject(`Error getting access token: ${err}`);
          } else {
            resolve(tokens.access_token); // 성공적으로 Access Token 반환
          }
        });
      } catch (error) {
        reject(`Failed to get access token: ${error.message}`);
      }
    });
  }

  async sendFcmpush(data: fcmpushDto) {
    const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH;
    const fcmUrl =
      'https://fcm.googleapis.com/v1/projects/bible25-237705/messages:send';

    const condition = {
      select: 'id, deviceId, pushyn',
      table: 'device_info',
      where: `deviceId = '${data.deviceId}' and pushyn = 1`,
    };

    const deviceInfo = await this.queryRunnerService.findOne(condition);

    if (deviceInfo) {
      const serviceAccount = JSON.parse(
        fs.readFileSync(serviceAccountPath, 'utf8'),
      );

      const client = new google.auth.JWT(
        serviceAccount.client_email,
        null,
        serviceAccount.private_key,
        ['https://www.googleapis.com/auth/firebase.messaging'],
      );

      await client.authorize();

      const accessToken = await client.getAccessToken();

      const messagePayload = {
        message: {
          token: data.deviceId,
          notification: {
            title: data.title,
            body: data.content,
          },
        },
      };

      await axios
        .post(fcmUrl, messagePayload, {
          headers: {
            Authorization: `Bearer ${accessToken.token}`,
            'Content-Type': 'application/json',
          },
        })
        .then((response) => console.log('firebaseFCMPush 성공', response.data))
        .catch((err) =>
          console.error('firebaseFCMPush 실패', err.response.data),
        );
    }

    return { code: 1000, message: 'complete', time: new Date().toISOString() };
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
      await axios
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

  //! 말씀따라 일부 기기에 보내기
  async sendMalsum(
    deviceId: string,
    id: number,
    title: string,
    yojul: string,
    song: string,
    bible: string,
    sungchal: string,
    kido: string,
    content: string,
    writer: string,
  ) {
    try {
      const accessToken = await this.getAccessToken(); // 인증 토큰 받기

      const condition = {
        select: 'id, deviceId, pushyn',
        table: 'device_info',
        where: `deviceId = '${deviceId}' and pushyn = 1`,
      };

      const deviceInfo = await this.queryRunnerService.findOne(condition);

      if (deviceInfo) {
        const message = {
          message: {
            token: deviceId,
            notification: {
              title,
              body: yojul,
            },
            data: {
              title,
              body: title,
              yojul,
              song,
              bible,
              sungchal,
              kido,
              content,
              writer,
              url: `https://bible25frontend.givemeprice.co.kr/share?list=malsumlist&id=${id}`,
            },
          },
        };

        // FCM 메시지 전송
        const response = await axios.post(
          `https://fcm.googleapis.com/v1/projects/bible25-237705/messages:send`,
          message,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`, // Bearer 인증 토큰 적용
              'Content-Type': 'application/json',
            },
          },
        );

        console.log('firebaseFCMPush 성공', response.data);
      }
    } catch (err) {
      console.log(
        'firebaseFCMPush 실패',
        err.response ? err.response.data : err.message,
      );
    }

    return { code: 1000, message: 'complete', time: new Date() };
  }

  async sendIyagiAll(title: string, content: string, id: number) {
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
      await axios
        .post(
          `https://fcm.googleapis.com/fcm/send`,
          {
            registration_ids:
              i === num - 1
                ? refinedList.slice(i * 1000)
                : refinedList.slice(i * 1000, (i + 1) * 1000),
            notification: {
              title,
              body: content,
            },
            data: {
              title,
              body: content,
              url: `https://bible25frontend.givemeprice.co.kr/share?list=iyagilist&id=${id}`,
            },
            'content-available': 1,
            priority: 'high',
          },
          {
            headers: {
              Authorization: 'key=' + Key,
            },
          },
        )
        .then(() => this.logger.debug(`FCM 푸시 성공 (${i}번째 루프 진행 중)`))
        .catch((err) => {
          this.logger.debug(`FCM 푸시 실패 (${i}번째 루프 진행 중)`);
          this.logger.debug(err);
        });
    }

    return;
  }
}
