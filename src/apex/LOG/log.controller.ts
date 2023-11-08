import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

import { ApiTags } from '@nestjs/swagger';
import {} from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ErrorLogDto } from './dtos/log.dto';
import { LogService } from './log.service';

@ApiTags('LOG')
@Controller('log')
@UseInterceptors(SuccessInterceptor)
export class LogController {
  constructor(
    private readonly logService: LogService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}
  @Post('error')
  async createLog(@Body() body: ErrorLogDto) {
    await this.logService.SaveError(body);
  }
}
