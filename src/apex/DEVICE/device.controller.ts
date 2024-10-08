import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { getToday } from 'src/common/utils/functions';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { DeviceService } from './device.serivce';
import { DeviceIdDto, PasswordDto } from './dtos/deviceId.dto';
import { fcmpushAllDto, fcmpushDto } from './dtos/fcmpush.dto';

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

  //! (특정 기기에) 말씀따라 푸시 전송하기
  @ApiOperation({ summary: '(특정 기기에) 말씀따라 푸시 전송하기' })
  @Post('fcmpushmalsum')
  async sendFcmpushMalsum(@Body() body: PasswordDto) {
    if (body.password === 'kviruslabPush') {
      //! 오늘 날짜 가져오기
      const today = getToday();

      //! (오늘 날짜) 최신 말씀따라 가져오기
      const condition = {
        select: 'id, title, yojul, song, bible, sungchal, kido, content',
        table: 'today_content',
        where: `today = '${today}' and gubun = 1`,
        orderBy: 'today desc',
        limit: 1,
        offset: 0,
      };

      const data = await this.queryRunnerService.findAndCount(condition);

      //! 보낼 데이터 가져오기
      const { id, title, yojul, song, bible, sungchal, kido, content, writer } =
        data.list[0];
      const modifiedTitle = `[말씀따라 - ${title}]`;
      const modifiedYojul =
        yojul.replace(/\n/g, ' ').replace(/ +/g, ' ').substring(0, 100) +
        `... [더보기]`;

      //! 앱 푸시 보내기
      this.deviceService.sendMalsum(
        body.deviceId,
        id,
        modifiedTitle,
        modifiedYojul,
        song,
        bible,
        sungchal,
        kido,
        content,
        writer,
      );
    }

    return 'success';
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

  //! (전체 기기에) 푸시 전송하기
  @ApiOperation({ summary: '(전체 기기에) 이미지메시지 전송하기' })
  @Post('fcmpush/iyagi')
  async sendIyagiAll(@Body() body: PasswordDto) {
    if (body.password === 'kviruslabPush') {
      //! 오늘 날짜 가져오기
      const today = getToday();

      //! (오늘 날짜 이전) 최신 이야기메시지 가져오기
      const condition = {
        select: 'title, content, id',
        table: 'today_content',
        where: `today = '${today}' and gubun = 3`,
        orderBy: 'today desc',
        limit: 1,
        offset: 0,
      };

      const data = await this.queryRunnerService.findAndCount(condition);

      //! 보낼 제목, 내용 가져오기
      const { title, content, id } = data.list[0];
      const modifiedTitle = `[이야기메시지 - ${title}]`;
      const modifiedContent = content.replace(/\n/g, ' ').replace(/ +/g, ' ');

      //! 앱 푸시 보내기
      this.deviceService.sendIyagiAll(modifiedTitle, modifiedContent, id);
    }

    return 0;
  }
}
