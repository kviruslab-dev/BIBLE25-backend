import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class AutoService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {
    if (!admin.apps.length) {
      // 이미 초기화된 경우 다시 초기화하지 않도록 조건을 추가
      const serviceAccount = require('../../../src/bible25_fcm.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }

  async sendFcmpushAll(title: string, content: string, id: number) {
    const devices = await this.queryRunnerService.query(`
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
    const total = devices.length;

    const token = devices.map((device) => device.deviceId);
    const num = Math.floor(total / 500) + 1;

    const message = {
      notification: {
        title: title,
        body: content,
      },
      data: {
        title: title,
        body: content,
        url: `https://bible25frontend.givemeprice.co.kr/share?list=iyagilist&id=${id}`,
      },
    };

    for (let i = 0; i < num; i++) {
      const tokens =
        i === num - 1
          ? token.slice(i * 500)
          : token.slice(i * 500, (i + 1) * 500);

      try {
        await admin.messaging().sendEachForMulticast({
          ...message,
          tokens: tokens,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  async sendFcmpush(title: string, content: string, id: number) {
    const devices = await this.queryRunnerService.query(`
    SELECT deviceId
    FROM device_info
    WHERE note = '박시온'
    `);

    const tokens = devices.map((device) => device.deviceId);

    const message = {
      notification: {
        title: title,
        body: content,
        image:
          'https://data.bible25.com/market/KakaoTalk_20240604_133855278.png',
      },
    };

    try {
      for (const token of tokens) {
        await admin.messaging().send({
          ...message,
          token: token,
        });
      }
      console.log('Successfully sent message to all devices');
    } catch (error) {
      console.error('Error sending message:', error);
    }
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
    const devices = await this.queryRunnerService.query(`
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

    const total = devices.length;

    const token = devices.map((device) => device.deviceId);
    const num = Math.floor(total / 500) + 1;

    const message = {
      notification: {
        title: yojul,
        body: title,
      },
      data: {
        title: title,
        body: content,
        // yojul: yojul,
        // song: song,
        // bible: bible,
        // sungchal: sungchal,
        // kido: kido,
        // content: content,
        // writer: writer,
        url: `https://bible25frontend.givemeprice.co.kr/share?list=malsumlist&id=${id}`,
      },
    };

    for (let i = 0; i < num; i++) {
      const tokens =
        i === num - 1
          ? token.slice(i * 500)
          : token.slice(i * 500, (i + 1) * 500);

      try {
        await admin.messaging().sendEachForMulticast({
          ...message,
          tokens: tokens,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }
}
