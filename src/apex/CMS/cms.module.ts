import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { CmsController } from './cms.controller';
import { CmsService } from './cms.service';
@Module({
  imports: [QueryRunnerModule],
  controllers: [CmsController],
  providers: [CmsService],
  exports: [],
})
export class CmsModule {}
