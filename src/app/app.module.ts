import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChansongModule } from 'src/apex/CHANSONG/chansong.module';
import { AdvertisementModule } from 'src/apex/ADVERTISEMENT/advertisement.module';
import { TodayModule } from 'src/apex/TODAY/today.module';
import { AutoModule } from 'src/apex/AUTO/auto.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from 'src/apex/PRODUCT/product.module';
import { BibleModule } from 'src/apex/BIBLE/bible.module';
import { BoardModule } from 'src/apex/BOARD/board.module';
import { SearchModule } from 'src/apex/SEARCH/search.module';
import { LogModule } from 'src/apex/LOG/log.module';
import { CommentModule } from 'src/apex/COMMENT/comment.module';
import { DeviceModule } from 'src/apex/DEVICE/device.module';
import { AdminModule } from 'src/apex/ADMIN/admin.module';
import { Bible25Module } from 'src/apex/BIBLE25/bible25.module';
import { FcmPushModule } from 'src/apex/FCMPUSH/fcmpush.module';
// import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
// import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: Number(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: JSON.parse(process.env.DATABASE_SYNCHRONIZE),
      logging: process.env.MODE === 'development' ? ['query', 'error'] : false,
    }),
    // ThrottlerModule.forRoot([
    //   {
    //     ttl: 1000,
    //     limit: 10,
    //   },
    // ]),
    ScheduleModule.forRoot(),
    AdminModule,
    AdvertisementModule,
    AutoModule,
    BibleModule,
    Bible25Module,
    BoardModule,
    DeviceModule,
    FcmPushModule,
    ChansongModule,
    ProductModule,
    TodayModule,
    SearchModule,
    LogModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // {
    //   provide: APP_GUARD,
    //   useClass: ThrottlerGuard,
    // },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
