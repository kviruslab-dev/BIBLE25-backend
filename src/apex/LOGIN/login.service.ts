import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async setLoginId(data: LoginDto) {
    const condition = {
      select: 'id, account_email, name, adid',
      table: 'users',
      where: `adid = '${data.adid}'`,
    };

    try {
      // 중복 확인
      const deviceInfo = await this.queryRunnerService.findOne(condition);

      if (deviceInfo) {
        return;
      }

      const maxUserIdCondition = {
        select: 'MAX(userId) as maxUserId',
        table: 'users',
      };
      const maxUserIdResult = await this.queryRunnerService.findOne(
        maxUserIdCondition,
      );
      const maxUserId = maxUserIdResult?.maxUserId || '0000000';

      const numericId = String(
        parseInt(maxUserId.slice(0, 7), 10) + 1,
      ).padStart(7, '0');
      const genderCode = data.gender === 'male' ? 'M' : 'W';
      const ageCode = data.age.split('_')[1]?.charAt(0) || '0'; // 예: 'AGE_20_29' -> '2'

      const newUserId = `${numericId}${genderCode}${ageCode}`;

      // 새 레코드 삽입
      const insertCondition = {
        table: 'users',
        columns: [
          'profile_nickname',
          'account_email',
          'name',
          'adid',
          'points',
          'gender',
          'phone_number',
          'age',
          'userId',
        ],
        values: [
          `'${data.profile_nickname}'`,
          `'${data.account_email}'`,
          `'${data.name}'`,
          `'${data.adid}'`,
          0,
          `'${data.gender}'`,
          `'${data.phone_number}'`,
          `'${data.age}'`,
          `'BK${newUserId}'`,
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
