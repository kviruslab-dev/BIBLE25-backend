import { Injectable } from '@nestjs/common';
import { transformDate } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { CommentDto } from './dtos/comment.dto';

@Injectable()
export class CommentService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async createComment(body: CommentDto) {
    const conditionForInsert = {
      table: 'comment',
      columns: ['phone', 'comment'],
      values: [`'${body.phone}'`, `'${body.comment}'`],
    };

    return await this.queryRunnerService.insert(conditionForInsert);
  }

  async findAndCount(condition: any) {
    const { list, total } = await this.queryRunnerService.findAndCount(
      condition,
    );

    return { list: transformDate(list), total };
  }
}
