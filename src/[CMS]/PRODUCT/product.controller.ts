import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ProductService } from './product.service';

@UseInterceptors(SuccessInterceptor)
@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @Get()
  async getData() {
    const condition = (gubun: number) => {
      return {
        select: 'id, title, money, star, dc, image, link',
        table: 'market_item',
        where: `showyn=true and active=1 and gubun='${gubun}'`,
        orderBy: 'sequence asc',
        limit: 10,
        offset: 0,
      };
    };

    return await this.productService.findAndCount(condition);
  }

  @Patch()
  async updateTick(@Query('id') id: number) {
    if (!id) {
      throw new HttpException(
        `id 값을 입력하지 않았습니다.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const condition = {
      table: 'market_item',
      set: 'tick=tick+1',
      where: `id=${id}`,
    };

    await this.queryRunnerService.update(condition);
  }
}
