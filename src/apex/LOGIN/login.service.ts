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

    try {
      // 중복 확인
      const deviceInfo = await this.queryRunnerService.findOne(condition);

      if (deviceInfo) {
        return; // 중복된 adid가 있으면 함수 종료
      }

      // 중복이 없을 때만 새 레코드 삽입
      const insertCondition = {
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

      await this.queryRunnerService.insert(insertCondition);
    } catch (error) {
      console.error('Error during setLoginId:', error);
      throw new Error('Database operation failed');
    }
  }

  async deleteId(adid: string) {
    const condition = {
      table: 'users',
      where: `adid = '${adid}'`,
    };
    return await this.queryRunnerService.delete(condition);
  }

  async findAdid(adid: string) {
    const condition = {
      select: 'profile_nickname, account_email, name, adid',
      table: 'users',
      where: `adid = '${adid}'`,
    };

    return await this.queryRunnerService.findOne(condition);
  }
}
