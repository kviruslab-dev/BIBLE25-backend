import { Injectable } from '@nestjs/common';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { elementDto } from './dtos/cmsUpdate.dto';

@Injectable()
export class CmsService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async updateCms(data: elementDto[]) {
    data.map(async (v) => {
      let setCondition: string;
      if (v.status && !v.memo && v.company) {
        setCondition = `status = '${v.status}', company = '${v.company}'`;
      }
      if (!v.status && v.memo && v.company) {
        setCondition = `memo = '${v.memo}', company = '${v.company}'`;
      }
      if (v.status && v.memo && v.company) {
        setCondition = `status = '${v.status}', memo = '${v.memo}', company = '${v.company}'`;
      }
      if (!v.status && !v.memo && v.company) {
        setCondition = `company = '${v.company}'`;
      }

      if (v.status && !v.memo && !v.company) {
        setCondition = `status = '${v.status}'`;
      }
      if (!v.status && v.memo && !v.company) {
        setCondition = `memo = '${v.memo}'`;
      }
      if (v.status && v.memo && !v.company) {
        setCondition = `status = '${v.status}', memo = '${v.memo}'`;
      }
      if (!v.status && !v.memo && !v.company) {
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
