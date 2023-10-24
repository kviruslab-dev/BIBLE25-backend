import { Injectable } from '@nestjs/common';
import { transformDate } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { CommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async createComment(data: CommentDto) {
    const condition = {
      select: 'id',
      table: 'comment',
      where: `phone ='${data.phone}'`,
    };

    const findByPhone = await this.queryRunnerService.findOne(condition);

    if (findByPhone) {
      return {
        list: '이미 응원댓글을 남기셨습니다.',
      };
    }

    const conditionForInsert = {
      table: 'comment',
      columns: ['phone', 'comment'],
      values: [`'${data.phone}'`, `'${data.comment}'`],
    };

    await this.queryRunnerService.insert(conditionForInsert);
    return {
      list: '응원에 참여해주셔서 감사합니다.',
    };
  }

  async findAndCount(condition: any) {
    const { list, total } = await this.queryRunnerService.findAndCount(
      condition,
    );

    return { list: transformDate(list), total };
  }
}
