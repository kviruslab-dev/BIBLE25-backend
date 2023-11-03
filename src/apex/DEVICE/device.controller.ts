import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeviceService } from './device.serivce';
import { DeviceIdDto } from './dtos/deviceId.dto';
import { fcmpushAllDto, fcmpushDto } from './dtos/fcmpush.dto';

@ApiTags('DEVICE')
@Controller('device')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  //! (특정 기기에) 푸시 전송하기
  @ApiOperation({ summary: '(특정 기기에) 푸시 전송하기' })
  @Post('fcmpush')
  async sendFcmpush(@Body() body: fcmpushDto) {
    const user = await this.deviceService.sendFcmpush(body);
    return user;
  }

  //! (전체 기기에) 푸시 전송하기
  @ApiOperation({ summary: '(전체 기기에) 푸시 전송하기' })
  @Post('fcmpush/all')
  async sendFcmpushAll(@Body() body: fcmpushAllDto) {
    const user = await this.deviceService.sendFcmpushAll(body);
    return user;
  }

  //! 기기 아이디 저장하기
  @ApiOperation({ summary: '기기 아이디 저장하기' })
  @Post('deviceid')
  async setDeviceId(@Body() body: DeviceIdDto) {
    return await this.deviceService.setDeviceId(body);
  }

  //! (모든) 기기 정보 가져오기
  @ApiOperation({ summary: '(모든) 기기 정보 가져오기' })
  @Get('deviceid')
  async getAll(@Query('take') take?: number, @Query('page') page?: number) {
    return await this.deviceService.getAll(take, page);
  }
}
