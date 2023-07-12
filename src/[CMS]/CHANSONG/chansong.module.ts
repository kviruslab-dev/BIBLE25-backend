import { Module } from '@nestjs/common';
import { ChansongController } from './chansong.controller';
import { ChansongService } from './chansong.service';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';

@Module({
  imports: [QueryRunnerModule],
  controllers: [ChansongController],
  providers: [ChansongService],
  exports: [],
})
export class ChansongModule {}
