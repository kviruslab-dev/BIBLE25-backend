import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class LoginService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async setLoginId(data: LoginDto) {
    const condition = {
      select: 'account_email, adid',
      table: 'users',
      where: `account_email = '${data.account_email}'`,
    };

    const outCondition = {
      select:
        'profile_nickname, account_email, name, adid, points, gender, phone_number, age, userId, model,carrier',
      table: 'users_out',
      where: `account_email = '${data.account_email}'`,
    };

    try {
      // 중복 확인
      const deviceInfo = await this.queryRunnerService.findOne(condition);
      const outInfo = await this.queryRunnerService.findOne(outCondition);

      if (outInfo) {
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
            'model',
            'carrier',
            'marketing_information',
            'receive_marketing',
            'email',
            'sms',
            'telephone',
            'location',
          ],
          values: [
            `'${outInfo.profile_nickname}'`,
            `'${outInfo.account_email}'`,
            `'${outInfo.name}'`,
            `'${outInfo.adid}'`,
            `'${outInfo.points}'`,
            `'${outInfo.gender}'`,
            `'${outInfo.phone_number}'`,
            `'${outInfo.age}'`,
            `'${outInfo.userId}'`,
            `'${outInfo.model}'`,
            `'${outInfo.carrier}'`,
            `${data.marketing_information}`,
            `${data.receive_marketing}`,
            `${data.email}`,
            `${data.sms}`,
            `${data.telephone}`,
            `${data.location}`,
          ],
        };

        await this.queryRunnerService.insert(insertCondition);

        const deleteCondition = {
          table: 'users_out',
          where: `account_email = '${data.account_email}'`,
        };
        return await this.queryRunnerService.delete(deleteCondition);
      }

      if (deviceInfo) {
        if (data.adid !== deviceInfo.adid) {
          const condition = {
            table: 'users',
            set: `
            adid='${data.adid}',
            marketing_information=${data.marketing_information},
            receive_marketing=${data.receive_marketing},
            email=${data.email},
            sms=${data.sms},
            telephone=${data.telephone},
            location=${data.location},
          `,
            where: `account_email = '${data.account_email}'`,
          };

          await this.queryRunnerService.updateMySQL(condition);
        }

        if (data.phone_number !== deviceInfo.phone_number) {
          const condition = {
            table: 'users',
            set: `
            phone_number='${data.phone_number}',
            marketing_information=${data.marketing_information},
            receive_marketing=${data.receive_marketing},
            email=${data.email},
            sms=${data.sms},
            telephone=${data.telephone},
            location=${data.location}
          `,
            where: `account_email = '${data.account_email}'`,
          };

          await this.queryRunnerService.updateMySQL(condition);
        }

        return;
      }

      // 새로운 userId 생성
      const maxIdResult = await this.queryRunnerService.query(`
      SELECT COALESCE(MAX(CAST(SUBSTRING(userId, 3, 7) AS UNSIGNED)), 0) AS maxId 
      FROM users
      WHERE userId REGEXP '^BK[0-9]{7}[A-Z0-9]*$';`);

      const maxId = Number(maxIdResult[0]?.maxId) || 0;
      const numericId = String(maxId + 1).padStart(7, '0'); // 7자리 숫자로 패딩
      const genderCode =
        data?.gender === 'MALE' ? 'M' : data?.gender === 'FEMALE' ? 'W' : 'H';
      const ageCode = data.age.split('_')[1]?.charAt(0) || '0'; // 예: 'AGE_20_29' -> '2'

      const userId = `BK${numericId}${genderCode}${ageCode}`;

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
          'model',
          'carrier',
          'marketing_information',
          'receive_marketing',
          'email',
          'sms',
          'telephone',
          'location',
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
          `'${userId}'`,
          `'${data.model}'`,
          `'${data.carrier}'`,
          `${data.marketing_information}`,
          `${data.receive_marketing}`,
          `${data.email}`,
          `${data.sms}`,
          `${data.telephone}`,
          `${data.location}`,
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
      select:
        'profile_nickname, account_email, name, adid, points, gender, phone_number, age, userId, model,carrier, marketing_information, receive_marketing, email, sms, telephone, location',
      table: 'users',
      where: `adid = '${adid}'`,
    };

    const data = await this.queryRunnerService.findOne(condition);

    const insertCondition = {
      table: 'users_out',
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
        'model',
        'carrier',
      ],
      values: [
        `'${data.profile_nickname}'`,
        `'${data.account_email}'`,
        `'${data.name}'`,
        `'${data.adid}'`,
        `${data.points}`,
        `'${data.gender}'`,
        `'${data.phone_number}'`,
        `'${data.age}'`,
        `'${data.userId}'`,
        `'${data.model}'`,
        `'${data.carrier}'`,
      ],
    };

    await this.queryRunnerService.insert(insertCondition);

    const deleteCondition = {
      table: 'users',
      where: `adid = '${adid}'`,
    };
    return await this.queryRunnerService.delete(deleteCondition);
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
