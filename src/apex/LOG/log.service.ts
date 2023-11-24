import { Injectable } from '@nestjs/common';
import { sendMessageToSlack } from 'src/common/utils/slackBot';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ErrorLogDto } from './dtos/log.dto';

@Injectable()
export class LogService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async SaveError(data: ErrorLogDto) {
    const { status_code, method, url, error } = data;

    const condition = {
      table: 'error_log',
      columns: `status_code, method, url, error, count`,
      values: `${status_code}, '${method}', '${url}', '${error}', '1'`,
    };

    await this.queryRunnerService.insert(condition);

    if (status_code === 404) return;

    sendMessageToSlack(`
    🚨 STATUS CODE : ${status_code} 🚨
    오류 메세지 : Cannot ${method} ${url},
    ${error}
    `);

    return;
  }
}
