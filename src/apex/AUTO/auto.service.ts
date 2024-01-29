import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';

//https://docs.nestjs.com/techniques/task-scheduling
@Injectable()
export class AutoService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  private readonly logger = new Logger(AutoService.name);

  async sendFcmpushAll(title: string, content: string, id: number) {
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
