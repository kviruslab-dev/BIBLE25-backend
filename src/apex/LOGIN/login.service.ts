import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async setLoginId(data: LoginDto) {
    const condition = {
      select: 'id, account_email',
      table: 'users',
      where: `account_email = '${data.account_email}'`,
    };

    const deviceInfo = await this.queryRunnerService.findOne(condition);

    if (deviceInfo) {
      return;
    }

    if (!deviceInfo) {
      const condition = {
        table: 'users',
        columns: ['profile_nickname', 'account_email', 'name'],
        values: [
          `'${data.profile_nickname}'`,
          `'${data.account_email}'`,
          `'${data.name}'`,
        ],
      };

      await this.queryRunnerService.insert(condition);
    }
  }
}
