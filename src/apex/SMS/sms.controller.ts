import { Body, Controller, Post } from '@nestjs/common';
import { CreateSmsDto } from './dtos/sms-create.dto';
import { SmsService } from './sms.service';

@Controller({
  version: '1',
  path: 'sms',
})
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  sendMessage(@Body() body: CreateSmsDto) {
    return this.smsService.sendMessage(body);
  }
}
