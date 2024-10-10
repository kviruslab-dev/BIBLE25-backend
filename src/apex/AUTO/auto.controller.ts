import { Controller, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { getToday } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { AutoService } from './auto.service';

@Controller('auto')
export class AutoController {
  constructor(
    private readonly autoService: AutoService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  private readonly logger = new Logger(AutoService.name);

  @Cron('0 50 15 * * *')
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
      const modifiedContent =
        content.replace(/\n/g, ' ').replace(/ +/g, ' ').substring(0, 100) +
        `... [더보기]`;

      //! 앱 푸시 보내기
      this.autoService.sendFcmpushAll(modifiedTitle, modifiedContent, id);
    }
  }

  @Cron('0 30 15 * * *')
  async SendMalsumPush() {
    if (process.env.MODE === 'production') {
      return;
    }

    if (process.env.MODE === 'development') {
      //! 오늘 날짜 가져오기
      const today = getToday();

      //! (오늘 날짜) 최신 말씀따라 가져오기
      const condition = {
        select: 'id, title, yojul, song, bible, sungchal, kido, content',
        table: 'today_content',
        where: `today = '${today}' and gubun = 1`,
        orderBy: 'today desc',
        limit: 1,
        offset: 0,
      };

      const data = await this.queryRunnerService.findAndCount(condition);

      //! 보낼 데이터 가져오기
      const { id, title, yojul, song, bible, sungchal, kido, content, writer } =
        data.list[0];
      const modifiedTitle = `[말씀따라 - ${title}]`;
      const modifiedYojul =
        yojul.replace(/\n/g, ' ').replace(/ +/g, ' ').substring(0, 100) +
        `... [더보기]`;

      //! 앱 푸시 보내기
      this.autoService.sendFcmMalsumAll(
        id,
        modifiedTitle,
        modifiedYojul,
        song,
        bible,
        sungchal,
        kido,
        content,
        writer,
      );
    }
  }
}
