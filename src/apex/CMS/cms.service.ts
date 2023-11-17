import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { elementDto } from './dtos/cmsUpdate.dto';

@Injectable()
export class CmsService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async updateCms(data: elementDto[]) {
    data.map(async (v) => {
      let setCondition: string;
      if (v.status && !v.memo) {
        setCondition = `status = '${v.status}'`;
      }
      if (!v.status && v.memo) {
        setCondition = `memo = '${v.memo}'`;
      }
      if (v.status && v.memo) {
        setCondition = `status = '${v.status}', memo = '${v.memo}'`;
      }
      if (!v.status && !v.memo) {
        return;
      }
      const condition = {
        table: 'kviruslab_cms',
        set: setCondition,
        where: `id = ${v.id}`,
      };
      this.queryRunnerService.updateMySQL(condition);
    });

    return;
  }
}
