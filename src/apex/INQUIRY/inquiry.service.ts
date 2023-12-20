import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { InquiryDto } from './dtos/inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async createInquiry(data: InquiryDto) {
    const condition = {
      select: 'id',
      table: 'inquiry',
      where: `name ='${data.name}' and phone='${data.phone}' and comment='${data.comment}'`,
    };

    const inquiry = await this.queryRunnerService.findOne(condition);

    if (inquiry) {
      return '동일한 수정/요청사항이 존재합니다.';
    }

    const conditionForInsert = {
      table: 'inquiry',
      columns: ['name', 'phone', 'comment'],
      values: [`'${data.name}'`, `'${data.phone}'`, `'${data.comment}'`],
    };

    await this.queryRunnerService.insert(conditionForInsert);
    return '수정/요청사항이 등록되었습니다.';
  }
}
