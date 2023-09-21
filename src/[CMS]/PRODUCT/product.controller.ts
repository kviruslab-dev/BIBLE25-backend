import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Patch,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { ProductService } from './product.service';
@ApiTags('PRODUCT')
@Controller('product')
@UseInterceptors(SuccessInterceptor)
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  @ApiOperation({ summary: '상품 데이터 가져오기' })
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

    return await this.productService.find(condition);
  }

  @ApiQuery({ name: 'id', required: true, type: String })
  @ApiOperation({ summary: '상품 클릭 수 증가시키기' })
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
