import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { InquiryController } from './inquiry.controller';
import { InquiryService } from './inquiry.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [InquiryController],
  providers: [InquiryService],
  exports: [],
})
export class InquiryModule {}
