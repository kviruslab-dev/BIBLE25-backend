import { Module } from '@nestjs/common';
import { QueryRunnerModule } from 'src/queryrunner/queryrunner.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [QueryRunnerModule],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [],
})
export class ProductModule {}
