import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async setLoginId(data: LoginDto) {
    const condition = {
      select: 'id, adid',
      table: 'users',
      where: `adid = '${data.adid}'`,
    };

    const deviceInfo = await this.queryRunnerService.findOne(condition);

    if (deviceInfo) {
      return;
    }

    if (!deviceInfo) {
      const condition = {
        table: 'users',
        columns: [
          'profile_nickname',
          'account_email',
          'name',
          'adid',
          'points',
        ],
        values: [
          `'${data.profile_nickname}'`,
          `'${data.account_email}'`,
          `'${data.name}'`,
          `'${data.adid}'`,
          0,
        ],
      };

      await this.queryRunnerService.insert(condition);
    }
  }

  async deleteId(adid: string) {
    const condition = {
      table: 'users',
      where: `adid = ${adid}`,
    };
    return await this.queryRunnerService.delete(condition);
  }
}
