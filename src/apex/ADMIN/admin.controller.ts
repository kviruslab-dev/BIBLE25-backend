import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import {
  advertisementInterceptor,
  SuccessInterceptor,
} from 'src/common/interceptors/success.interceptor';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { AdminService } from './admin.service';
import { UpdateDto } from './dtos/update.dto';
import { InsertAdvertisementDto } from './dtos/insertMarket.dto';
import { InsertProductDto } from './dtos/insertProduct.dto';
import { InsertBoardDto } from './dtos/insertBoard.dto';
import { InsertDto } from './dtos/insert.dto';

@ApiTags('ADMIN')
@Controller('admin')
@UseInterceptors(SuccessInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description: '타입 : main, bible, hymm, lab, todays, product, donate, etc',
  })
  @ApiOperation({ summary: '광고 데이터 가져오기 (어드민)' })
  @UseInterceptors(advertisementInterceptor)
  @Get('select')
  async findAndCount(@Query('type') type: string) {
    return await this.adminService.findAndCount(type);
  }

  @ApiOperation({ summary: '광고 데이터 수정하기 (어드민)' })
  @Patch('update')
  async update(@Body() body: UpdateDto) {
    return await this.adminService.update(body);
  }

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description: '타입 : main, bible, hymm, lab, todays, product, donate, etc',
  })
  @ApiOperation({ summary: '데이터 추가하기 (어드민)' })
  @Post('insert')
  async insert(@Query('type') type: string, @Body() body: InsertDto) {
    return await this.adminService.insert(type, body);
  }

  @ApiOperation({ summary: '데이터 추가하기 (어드민, 광고)' })
  @Post('insertAd')
  async insertAd(@Body() body: InsertAdvertisementDto) {
    return await this.adminService.insertAd(body);
  }

  @ApiOperation({ summary: '데이터 추가하기 (어드민, 상품)' })
  @Post('insertPd')
  async insertPd(@Body() body: InsertProductDto) {
    return await this.adminService.insertPd(body);
  }

  @ApiOperation({ summary: '데이터 추가하기 (어드민, 후원)' })
  @Post('insertBd')
  async insertBd(@Body() body: InsertBoardDto) {
    return await this.adminService.insertBd(body);
  }

  @ApiQuery({
    name: 'type',
    required: false,
    type: String,
  })
  @ApiOperation({ summary: '지역 정보 가져오기' })
  @Get('local')
  async getLocal(@Query('type') type: string | undefined) {
    return await this.adminService.getLocal(type);
  }

  @ApiQuery({
    name: 'type',
    required: true,
    type: String,
    description: '타입 : main, bible, hymm, lab, todays, product, donate, etc',
  })
  @ApiQuery({
    name: 'id',
    required: true,
    type: Number,
    description: '데이터의 아이디',
  })
  @ApiOperation({ summary: '데이터 삭제하기 (어드민)' })
  @Delete('delete')
  async delete(@Query('type') type: string, @Query('id') id: number) {
    return await this.adminService.delete(type, id);
  }
}
