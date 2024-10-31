import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { fcmpushDto } from './dtos/fcmpush.dto';

@Injectable()
export class DeviceService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {
    if (!admin.apps.length) {
      // 이미 초기화된 경우 다시 초기화하지 않도록 조건을 추가
      const serviceAccount = require('../../../src/bible25_fcm.json');
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
  }

  async sendFcmpush(data: fcmpushDto) {
    const devices = await this.queryRunnerService.query(`
    SELECT deviceId
    FROM device_info
    WHERE deviceId = '${data.deviceId}'
    `);

    const tokens = devices.map((device) => device.deviceId);

    const message = {
      notification: {
        title: data.title,
        body: data.content,
        image:
          'https://data.bible25.com/market/KakaoTalk_20240604_133855278.png',
      },
      data: {
        title: data.title,
        body: data.content,
        url: `https://bible25frontend.givemeprice.co.kr/share?list=iyagilist&id=100`,
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
}
