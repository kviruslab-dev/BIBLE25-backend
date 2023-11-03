import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { FcmPushController } from './fcmpush.controller';
import { FcmPushService } from './fcmpush.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [FcmPushController],
  providers: [FcmPushService],
  exports: [],
})
export class FcmPushModule {}
