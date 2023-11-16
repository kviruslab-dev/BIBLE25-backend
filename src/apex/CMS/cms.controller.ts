import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { CmsService } from './cms.service';
import { CmsDto } from './dtos/cms.dto';

@ApiTags('CMS')
@Controller('cms')
@UseInterceptors(SuccessInterceptor)
export class CmsController {
  constructor(
    private readonly cmsService: CmsService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Post()
  async createCms(@Body() body: CmsDto) {
    const condition = {
      table: 'kviruslab_cms',
      columns: 'name, phone',
      values: `'${body.name}', '${body.phone}'`,
    };

    await this.queryRunnerService.insert(condition);
  }

  @Get()
  async select(@Query('take') take = 10, @Query('page') page = 1) {
    const condition = {
      select: 'create_at, id, name, phone',
      table: 'kviruslab_cms',
      where: `TRUE`,
      orderBy: 'id asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    const data = await this.queryRunnerService.findAndCount(condition);

    data.list.forEach(
      (v: any) => (v.create_at = v.create_at.toLocaleString().slice(0, 34)),
    );

    return data.list;
  }
}
