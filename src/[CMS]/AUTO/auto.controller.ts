import { Controller, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getNDaysAgo, getToday } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { AutoService } from './auto.service';

@Controller('auto')
export class AutoController {
  constructor(
    private readonly autoService: AutoService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  private readonly logger = new Logger(AutoService.name);

  @Cron('0 0 0 * * *')
  async handleCronEveryDay() {
    const today = getToday();

    const conditionForReset = {
      table: 'today_content',
      set: 'active = 0',
      where: 'TRUE',
    };

    await this.queryRunnerService.update(conditionForReset);

    const conditionForUpToDate = {
      table: 'today_content',
      set: 'active = 1',
      where: `today = '${today}'`,
    };

    await this.queryRunnerService.update(conditionForUpToDate);

    const conditionForResetImage = {
      table: 'today_image',
      set: 'active = 0',
      where: 'TRUE',
    };

    await this.queryRunnerService.update(conditionForResetImage);

    const oneDaysAgo = getNDaysAgo(1);
    const twoDaysAgo = getNDaysAgo(2);

    const conditionForUpToDateImage = {
      table: 'today_content',
      set: 'active = 1',
      where: `today='${today}' or today='${oneDaysAgo}' or today='${twoDaysAgo}'`,
    };

    await this.queryRunnerService.update(conditionForUpToDateImage);

    this.logger.debug('TODAY 컨텐츠들의 active 값을 최신화합니다.');

    // TODO (today_content_his, today_image_his에 데이터 저장하기)
    // TODO (오래된 데이터 삭제하기)
  }
}
