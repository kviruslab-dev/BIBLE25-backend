import { Injectable } from '@nestjs/common';
import { sendMessageToSlack } from 'src/common/utils/slackBot';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ErrorLogDto } from './dtos/log.dto';

@Injectable()
export class LogService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async SaveErrror(data: ErrorLogDto) {
    const { status_code, method, url, error } = data;

    //! 3일 내에 같은 에러가 발생한 적이 있는지 확인한다.
    const findOneCondition = {
      select: 'id, count',
      table: 'error_log',
      where: `status_code=${status_code} and method='${method}' and url='${url}' and error='${error}' and DATEDIFF(NOW(), created_at) <= 3`,
    };

    const errorLog = await this.queryRunnerService.findOne(findOneCondition);

    //! 3일 내에 발생하지 않았던 에러인 경우, 슬랙봇을 통해 개발팀에 알린다.
    if (!errorLog) {
      sendMessageToSlack(`
      🚨🚨🚨 STATUS CODE : ${status_code} 🚨🚨🚨
      오류 메세지 : Cannot ${method} ${url},
      ${error}
      `);
    }

    //! 에러 내용을 저장한다.
    const condition = {
      table: 'error_log',
      columns: `status_code, method, url, error, count`,
      values: `${status_code}, '${method}', '${url}', '${error}', '1'`,
    };

    await this.queryRunnerService.insert(condition);
    return;
  }
}
