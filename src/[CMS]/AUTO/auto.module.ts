import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { AutoController } from './auto.controller';
import { AutoService } from './auto.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [AutoController],
  providers: [AutoService],
  exports: [],
})
export class AutoModule {}
