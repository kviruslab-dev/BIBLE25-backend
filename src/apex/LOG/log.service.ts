import { Injectable } from '@nestjs/common';
import { sendMessageToSlack } from 'src/common/utils/slackBot';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ErrorLogDto } from './dtos/log.dto';

@Injectable()
export class LogService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async SaveError(data: ErrorLogDto) {
    const { status_code, method, url, query, body, error } = data;

    const condition = {
      table: 'error_log',
      columns: `status_code, method, url, query, body, error, count`,
      values: `${status_code}, '${method}', '${url}', '${query}', '${body}', '${error}', '1'`,
    };

    this.queryRunnerService.insert(condition);

    if (status_code === 404) return;

    sendMessageToSlack(`
    🚨 상태 코드: ${status_code} 🚨
    오류 링크: [${method}] ${url}
    에러 내용: ${error}
    입력 쿼리: ${query},
    입력 바디: ${body}
    `);

    return;
  }
}
