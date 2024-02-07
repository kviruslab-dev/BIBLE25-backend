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

    // await this.queryRunnerService.update(conditionForReset);

    const conditionForUpToDate = {
      table: 'today_content',
      set: 'active = 1',
      where: `today = '${today}'`,
    };

    // await this.queryRunnerService.update(conditionForUpToDate);

    const conditionForResetImage = {
      table: 'today_image',
      set: 'active = 0',
      where: 'TRUE',
    };

    // await this.queryRunnerService.update(conditionForResetImage);

    const oneDaysAgo = getNDaysAgo(1);
    const twoDaysAgo = getNDaysAgo(2);

    const conditionForUpToDateImage = {
      table: 'today_content',
      set: 'active = 1',
      where: `today='${today}' or today='${oneDaysAgo}' or today='${twoDaysAgo}'`,
    };

    // await this.queryRunnerService.update(conditionForUpToDateImage);

    this.logger.debug('TODAY 컨텐츠들의 active 값을 최신화합니다.');

    // TODO (today_content_his, today_image_his에 데이터 저장하기)
    // TODO (오래된 데이터 삭제하기)
  }

  @Cron('0 0 12 * * *')
  async SendAppPush() {
    if (process.env.MODE === 'production') {
      return;
    }

    if (process.env.MODE === 'development') {
      //! 오늘 날짜 가져오기
      const today = getToday();

      //! (오늘 날짜 이전) 최신 이야기메시지 가져오기
      const condition = {
        select: 'title, content, id',
        table: 'today_content',
        where: `today = '${today}' and gubun = 3`,
        orderBy: 'today desc',
        limit: 1,
        offset: 0,
      };

      const data = await this.queryRunnerService.findAndCount(condition);

      //! 보낼 제목, 내용 가져오기
      const { title, content, id } = data.list[0];
      const modifiedTitle = `[이야기메시지 - ${title}]`;
      const modifiedContent = content.replace(/\n/g, ' ').replace(/ +/g, ' ');

      //! 앱 푸시 보내기
      this.autoService.sendFcmpushAll(modifiedTitle, modifiedContent, id);
    }
  }
}
