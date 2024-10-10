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
    // 디바이스 목록 가져오기
    // const list = await this.queryRunnerService.query(`
    //   SELECT deviceId
    //   FROM (
    //       SELECT deviceId, MAX(create_at) AS max_create_at
    //       FROM device_info
    //       WHERE pushyn = 1
    //       GROUP BY deviceId
    //   ) AS recent_devices
    //   ORDER BY max_create_at DESC
    //   LIMIT 100000000
    //   OFFSET 0;
    // `);
    const list = await this.queryRunnerService.query(`
      SELECT deviceId
      from device_info WHERE note = '박시온'
    `);

    // 디바이스 ID 배열 추출
    const refinedList = list.map((i: any) => i.deviceId);
    const chunkSize = 500; // FCM에서 권장하는 최대 500개로 나누기

    const sendPromises = [];

    // 500개씩 묶음으로 나눠서 처리
    for (let i = 0; i < refinedList.length; i += chunkSize) {
      const tokens = refinedList.slice(i, i + chunkSize);

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
        token: tokens,
      };

      // FCM의 sendMulticast 사용 (여러 토큰에 동시에 메시지 전송)
      sendPromises.push(this.firebaseApp.messaging().send(message));
    }

    try {
      // 모든 메시지 전송이 완료될 때까지 기다림
      const responses = await Promise.all(sendPromises);
      responses.forEach((response, index) => {
        console.log(
          `Batch ${index + 1}: Successfully sent messages:`,
          response.successCount,
        );
        console.log(
          `Batch ${index + 1}: Failed messages:`,
          response.failureCount,
        );
      });
    } catch (error) {
      console.error('Error sending messages:', error);
      throw error;
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
