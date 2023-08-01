import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChansongModule } from 'src/[CMS]/CHANSONG/chansong.module';
import { AdvertisementModule } from 'src/[CMS]/ADVERTISEMENT/advertisement.module';
import { TodayModule } from 'src/[CMS]/TODAY/today.module';
import { AutoModule } from 'src/[CMS]/AUTO/auto.module';
import { ScheduleModule } from '@nestjs/schedule';
import { ProductModule } from 'src/[CMS]/PRODUCT/product.module';
import { BibleModule } from 'src/[CMS]/BIBLE/bible.module';

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
    AdvertisementModule,
    AutoModule,
    BibleModule,
    ChansongModule,
    TodayModule,
    ScheduleModule.forRoot(),
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
