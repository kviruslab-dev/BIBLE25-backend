import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { LogController } from './log.controller';
import { LogService } from './log.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [LogController],
  providers: [LogService],
  exports: [],
})
export class LogModule {}
