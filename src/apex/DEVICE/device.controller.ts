import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { DeviceService } from './device.serivce';
import { fcmpushDto } from './dtos/fcmpush.dto';

@ApiTags('DEVICE')
@Controller('device')
export class DeviceController {
  constructor(
    private readonly deviceService: DeviceService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  //! (특정 기기에) 푸시 전송하기
  @ApiOperation({ summary: '(특정 기기에) 푸시 전송하기' })
  @Post('fcmpush')
  async sendFcmpush(@Body() body: fcmpushDto) {
    await this.deviceService.sendFcmpush(body);
    return 'wow';
  }

  //! (모든) 기기 정보 가져오기
  @ApiOperation({ summary: '(모든) 기기 정보 가져오기' })
  @Get('deviceid')
  async getAll(@Query('take') take?: number, @Query('page') page?: number) {
    return await this.deviceService.getAll(take, page);
  }
}
