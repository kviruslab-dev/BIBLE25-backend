import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { CmsService } from './cms.service';
import { CmsDto } from './dtos/cms.dto';
import { elementDto } from './dtos/cmsUpdate.dto';

@ApiTags('CMS')
@Controller('cms')
@UseInterceptors(SuccessInterceptor)
export class CmsController {
  constructor(
    private readonly cmsService: CmsService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Post()
  async createCms(@Body() body: CmsDto, @Query('admin') admin = 'default') {
    const condition = {
      table: 'kviruslab_cms',
      columns: 'name, phone, status, memo, company, admin',
      values: `'${body.name}', '${body.phone}', '${body.status}', '', '${body.company}', '${admin}'`,
    };

    return await this.queryRunnerService.insert(condition);
  }

  @Get()
  async select(
    @Query('take') take = 10,
    @Query('page') page = 1,
    @Query('admin') admin = 'default',
  ) {
    //! 현재 운영중인 cms 어드민의 로직을 건드리지 않아야 한다.
    const whereCondition = admin === 'default' ? 'TRUE' : `admin='${admin}'`;

    const condition = {
      select: 'create_at, id, name, phone, status, memo, company',
      table: 'kviruslab_cms',
      where: whereCondition,
      orderBy: 'id asc',
      limit: String(take ? take : 10),
      offset: String(page ? take * (page - 1) : 0),
    };

    const data = await this.queryRunnerService.findAndCount(condition);

    const dateInfo = (create_at: Date) => {
      return `${create_at.getFullYear()}-${
        create_at.getMonth() + 1
      }-${create_at.getDate()}`;
    };

    data.list.forEach((v: any) => (v.create_at = dateInfo(v.create_at)));

    return data.list;
  }

  @Patch()
  async update(@Body() body: elementDto[]) {
    await this.cmsService.updateCms(body);
  }

  @Delete()
  async delete(@Query('id') id: number) {
    await this.cmsService.delete(id);
  }
}
