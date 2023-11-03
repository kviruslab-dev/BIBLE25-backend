import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { BibleController } from './bible.controller';
import { BibleService } from './bible.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [BibleController],
  providers: [BibleService],
  exports: [],
})
export class BibleModule {}
