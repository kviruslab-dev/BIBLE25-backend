import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';

@Module({
  imports: [QueryRunnerModule],
  controllers: [CommentController],
  providers: [CommentService],
  exports: [],
})
export class CommentModule {}
