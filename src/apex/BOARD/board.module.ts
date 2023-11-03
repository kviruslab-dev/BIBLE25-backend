import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [],
})
export class BoardModule {}
