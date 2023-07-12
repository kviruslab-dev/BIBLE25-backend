import { Module } from '@nestjs/common';
import { QueryRunnerService } from './queryrunner.service';
import { DataSource } from 'typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DataSource])],
  providers: [QueryRunnerService],
  exports: [QueryRunnerService],
})
export class QueryRunnerModule {}
