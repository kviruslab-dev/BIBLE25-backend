import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { Board } from 'src/common/entities/board.entity';
import { Market } from 'src/common/entities/market.entity';
import { MarketItem } from 'src/common/entities/product.entity';
import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { ToDayContent } from 'src/common/entities/todaycontent.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    QueryRunnerModule,
    TypeOrmModule.forFeature([ToDayContent]),
    TypeOrmModule.forFeature([Market]),
    TypeOrmModule.forFeature([MarketItem]),
    TypeOrmModule.forFeature([Board]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [],
})
export class AdminModule {}
