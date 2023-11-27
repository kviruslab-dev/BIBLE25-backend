import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { ToDayContent } from 'src/common/entities/todaycontent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [QueryRunnerModule, TypeOrmModule.forFeature([ToDayContent])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
