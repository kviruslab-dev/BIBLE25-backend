import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import * as admin from 'firebase-admin';
import { JWT } from 'google-auth-library';
import * as serviceAccount from 'src/bible25_fcm.json';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

@Injectable()
export class AutoService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {
    // Firebase Admin SDK 초기화
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    });
  }

  private readonly logger = new Logger(AutoService.name);
  private readonly projectId = 'bible-app-project';

  // Bearer 토큰을 얻기 위한 메서드
  private async getAccessToken() {
    const client = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/firebase.messaging'],
    });

    const tokens = await client.authorize();
    return tokens.access_token;
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
            title,
            body: content,
          },
          data: {
            title,
            body: content,
            url: `https://bible25frontend.givemeprice.co.kr/share?list=iyagilist&id=${id}`,
          },
          tokens: tokens,
        },
      };

      const accessToken = await this.getAccessToken();

      // FCM v1 API를 사용하여 메시지 전송
      await axios
        .post(
          `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`,
          message,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          this.logger.debug(`FCM 푸시 성공: ${response.data}`);
        })
        .catch((err) => {
          this.logger.error(`FCM 푸시 실패 (${i}번째 루프 진행 중)`);
          this.logger.error(err);
        });
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
          tokens: tokens,
        },
      };

      const accessToken = await this.getAccessToken();

      // FCM v1 API를 사용하여 메시지 전송
      await axios
        .post(
          `https://fcm.googleapis.com/v1/projects/${this.projectId}/messages:send`,
          message,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          },
        )
        .then((response) => {
          this.logger.debug(`FCM 푸시 성공: ${response.data}`);
        })
        .catch((err) => {
          this.logger.error(`FCM 푸시 실패 (${i}번째 루프 진행 중)`);
          this.logger.error(err);
        });
    }

    return;
  }
}
