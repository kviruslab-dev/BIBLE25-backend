import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { DeviceIdDto } from './dtos/deviceId.dto';
import { FcmPushService } from './fcmpush.service';

@ApiTags('DEVICE')
@Controller('fcmpush')
export class FcmPushController {
  constructor(private readonly fcmPushService: FcmPushService) {}

  //! (특정 기기에) 푸시 전송하기
  @ApiOperation({ summary: '(특정 기기에) 푸시 전송하기' })
  @Post('deviceid')
  async sendDeviceId(@Body() body: DeviceIdDto) {
    const user = await this.fcmPushService.setDeviceID(body);
    return user;
  }
}
