import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class AutoService {
  private firebaseApp: admin.app.App;

  constructor(private readonly queryRunnerService: QueryRunnerService) {
    // Firebase Admin SDK 초기화
    const serviceAccount = require('../../../src/bible25_fcm.json');
    this.firebaseApp = admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });
  }

  async sendFcmpushAll(title: string, content: string, id: number) {
    const list = await this.queryRunnerService.query(`
    SELECT deviceId
    FROM (
        SELECT deviceId, MAX(create_at) AS max_create_at
        FROM device_info
        WHERE pushyn = 1
        GROUP BY deviceId
    ) AS recent_devices
    ORDER BY max_create_at DESC
    LIMIT 100000000
    OFFSET 0;
    `);
    //! 데이터의 전체 갯수 확인하기
    const total = list.length;

    const refinedList = list.map((i: object) => i['deviceId']);
    const num = Math.floor(total / 1000) + 1;

    for (let i = 0; i < num; i++) {
      const tokens =
        i === num - 1
          ? refinedList.slice(i * 1000)
          : refinedList.slice(i * 1000, (i + 1) * 1000);

      const message = {
        message: {
          notification: {
            title: title,
            body: content,
          },
          data: {
            title: title,
            body: content,
            url: `https://bible25frontend.givemeprice.co.kr/share?list=iyagilist&id=${id}`,
          },
          token: tokens,
        },
      };

      try {
        const response = await this.firebaseApp
          .messaging()
          .send(message.message);
        console.log('Successfully sent message:', response);
        return response;
      } catch (error) {
        console.log('Error sending message:', error);
        throw error;
      }
    }

    return;
  }

  async sendFcmMalsumAll(
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
    const list = await this.queryRunnerService.query(`
    SELECT deviceId
    FROM (
        SELECT deviceId, MAX(create_at) AS max_create_at
        FROM device_info
        WHERE pushyn = 1
        GROUP BY deviceId
    ) AS recent_devices
    ORDER BY max_create_at DESC
    LIMIT 100000000
    OFFSET 0;
    `);
    //! 데이터의 전체 갯수 확인하기
    const total = list.length;

    const refinedList = list.map((i: object) => i['deviceId']);
    const num = Math.floor(total / 1000) + 1;

    for (let i = 0; i < num; i++) {
      const tokens =
        i === num - 1
          ? refinedList.slice(i * 1000)
          : refinedList.slice(i * 1000, (i + 1) * 1000);

      const message = {
        message: {
          notification: {
            title: yojul,
            body: title,
          },
          data: {
            title,
            yojul,
            song,
            bible,
            sungchal,
            kido,
            content,
            writer,
            url: `https://bible25frontend.givemeprice.co.kr/share?list=malsumlist&id=${id}`,
          },
          token: tokens,
        },
      };

      try {
        const response = await this.firebaseApp
          .messaging()
          .send(message.message);
        console.log('Successfully sent message:', response);
        return response;
      } catch (error) {
        console.log('Error sending message:', error);
        throw error;
      }
    }

    return;
  }
}
