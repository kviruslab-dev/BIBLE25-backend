import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { DeviceService } from './device.serivce';
import { DeviceController } from './device.controller';

@Module({
  imports: [QueryRunnerModule],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [],
})
export class DeviceModule {}
