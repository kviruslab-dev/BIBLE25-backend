import { forwardRef, Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { CatController } from './controllers/cat.controller';
import { Cat } from './cat.entity';
import { CatRepository } from './cat.repository';
import { CatService } from './services/cat.service';

@Module({
  imports: [
    MulterModule.register({ dest: './upload' }),
    TypeOrmModule.forFeature([Cat]),
    forwardRef(() => AuthModule),
  ],
  controllers: [CatController],
  providers: [CatService, CatRepository],
  exports: [CatService, CatRepository],
})
export class CatModule {}
