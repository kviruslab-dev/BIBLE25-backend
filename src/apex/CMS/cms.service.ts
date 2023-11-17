import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { CmsUpdateDto } from './dtos/cmsUpdate.dto';

@Injectable()
export class CmsService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async updateCms(data: CmsUpdateDto) {
    let setCondition: string;

    if (data.status && !data.memo) {
      setCondition = `status = '${data.status}'`;
    }

    if (!data.status && data.memo) {
      setCondition = `memo = '${data.memo}'`;
    }

    if (data.status && data.memo) {
      setCondition = `status = '${data.status}', memo = '${data.memo}'`;
    }

    if (!data.status && !data.memo) {
      return;
    }

    const condition = {
      table: 'kviruslab_cms',
      set: setCondition,
      where: `id = ${data.id}`,
    };

    await this.queryRunnerService.updateMySQL(condition);
  }
}
