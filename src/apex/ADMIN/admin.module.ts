import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
