import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [SearchController],
  providers: [SearchService],
  exports: [],
})
export class SearchModule {}
