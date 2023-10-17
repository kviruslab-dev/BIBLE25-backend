import {
  Body,
  Controller,
  Get,
  Patch,
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

  // @Post('insert')
  // async insert(@Body() body: insertDto) {
  //   return await this.advertisementService.insert(body);
  // }

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
}
