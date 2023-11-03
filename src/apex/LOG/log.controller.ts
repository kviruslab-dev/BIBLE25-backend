import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';

import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import {} from 'src/common/utils/functions';
import { ApiTags } from '@nestjs/swagger';
import { LogService } from './log.service';
import { ErrorLogDto } from './dtos/log.dto';

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
    await this.logService.SaveErrror(body);
  }
}
