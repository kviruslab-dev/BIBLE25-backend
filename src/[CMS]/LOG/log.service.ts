import { Injectable } from '@nestjs/common';
import { sendMessageToSlack } from 'src/common/utils/slackBot';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ErrorLogDto } from './dtos/log.dto';

@Injectable()
export class LogService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async SaveErrror(data: ErrorLogDto) {
    const { status_code, method, url, error } = data;

    try {
      const findOneCondition = {
        select: 'id, count',
        table: 'error_log',
        where: `status_code=${status_code} and method='${method}' and url='${url}' and error='${error}'`,
      };

      const isExist = await this.queryRunnerService.findOne(findOneCondition);
      const newCount = isExist.count + 1;
      const targetId = isExist.id;

      const updateQuery = `UPDATE error_log SET count = ${newCount} WHERE id = ${targetId}`;
      await this.queryRunnerService.query(updateQuery);
      return;
    } catch {
      const condition = {
        table: 'error_log',
        columns: `status_code, method, url, error, count`,
        values: `${status_code}, '${method}', '${url}', '${error}', '1'`,
      };

      await this.queryRunnerService.insert(condition);

      // 슬랙으로 메세지 전송
      sendMessageToSlack(`
      🚨🚨🚨 STATUS CODE : ${status_code} 🚨🚨🚨
      오류 메세지 : Cannot ${method} ${url},
      ${error}
      `);
      return;
    }
  }
}
