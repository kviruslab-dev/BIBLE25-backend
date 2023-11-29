import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  advertisementInterceptor,
  SuccessInterceptor,
} from 'src/common/interceptors/success.interceptor';
import { multerOptions } from 'src/common/utils/multer.options';
import { AdminService } from './admin.service';
import { CreateBoardDto } from './dtos/createBoard.dto';
import { CreateCalumDto } from './dtos/createCalum.dto';
import { CreateMalsumDto } from './dtos/createMalsum.dto';
import { CreateMarketDto } from './dtos/createMarket.dto';
import { CreateProductDto } from './dtos/createProduct.dto';
import { CreateTodayBookDto } from './dtos/createTodayBook.dto';
import { UpdateBoardDto } from './dtos/updateBoard.dto';
import { UpdateCalumDto } from './dtos/updateCalum.dto';
import { UpdateMalsumDto } from './dtos/updateMalsum.dto';
import { UpdateMarketDto } from './dtos/updateMarket.dto';
import { UpdateProductDto } from './dtos/updateProduct.dto';
import { UpdateTodayBookDto } from './dtos/updateTodayBook.dto';

@ApiTags('ADMIN')
@Controller('admin')
@UseInterceptors(SuccessInterceptor)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  //! 광고 가져오기
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

  //! 오늘의책 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Post('todaybook')
  async createTodayBook(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateTodayBookDto,
  ) {
    await this.adminService.createTodayBook(files, body);
    return;
  }

  @Get('todaybook')
  async getTodayBook(@Query('take') take = 10, @Query('page') page = 1) {
    return await this.adminService.getTodayBook(take, page);
  }

  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Patch('todaybook')
  async updateTodayBook(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UpdateTodayBookDto,
  ) {
    await this.adminService.updateTodayBook(files, body);
    return;
  }

  //! 칼럼 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Post('calum')
  async createCalum(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateCalumDto,
  ) {
    await this.adminService.createCalum(files, body);
    return;
  }

  @Get('calum')
  async getCalum(@Query('take') take = 10, @Query('page') page = 1) {
    return await this.adminService.getCalum(take, page);
  }

  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Patch('calum')
  async updateCalum(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UpdateCalumDto,
  ) {
    await this.adminService.updateCalum(files, body);
    return;
  }

  //! 말씀따라 어드민
  @Post('malsum')
  async createMalsum(@Body() body: CreateMalsumDto) {
    return await this.adminService.createMalsum(body);
  }

  @Get('malsum')
  async getMalsum(@Query('take') take = 10, @Query('page') page = 1) {
    return await this.adminService.getMalsum(take, page);
  }

  @Patch('malsum')
  async updateMalsum(@Body() body: UpdateMalsumDto[]) {
    return await this.adminService.updateMalsum(body);
  }

  //! 광고 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Post('ad')
  async createAd(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateMarketDto,
  ) {
    await this.adminService.createAd(files, body);
    return;
  }

  //! 상품 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Post('pd')
  async createPd(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateProductDto,
  ) {
    await this.adminService.createPd(files, body);
    return;
  }

  //! 후원 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Post('bd')
  async createBd(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: CreateBoardDto,
  ) {
    await this.adminService.createBd(files, body);
    return;
  }

  //! 광고 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Patch('ad')
  async updateAd(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UpdateMarketDto,
  ) {
    await this.adminService.updateAd(files, body);
    return;
  }

  //! 상품 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Patch('pd')
  async updatePd(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UpdateProductDto,
  ) {
    await this.adminService.updatePd(files, body);
    return;
  }

  //! 후원 어드민
  @UseInterceptors(FilesInterceptor('upload', 10, multerOptions('file')))
  @Patch('bd')
  async updateBd(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body() body: UpdateBoardDto,
  ) {
    await this.adminService.updateBd(files, body);
    return;
  }
}
