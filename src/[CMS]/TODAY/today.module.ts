import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { TodayController } from './today.controller';
import { TodayService } from './today.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [TodayController],
  providers: [TodayService],
  exports: [],
})
export class TodayModule {}
