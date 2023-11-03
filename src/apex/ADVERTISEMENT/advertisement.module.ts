import { Module } from '@nestjs/common';
import { AdvertisementService } from './advertisement.service';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { AdvertisementController } from './advertisement.controller';

@Module({
  imports: [QueryRunnerModule],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
  exports: [],
})
export class AdvertisementModule {}
