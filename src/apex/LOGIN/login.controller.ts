import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { LoginDto } from './dtos/login.dto';
import { LoginService } from './login.service';

@ApiTags('LOGIN')
@Controller('login')
export class LoginController {
  constructor(
    private readonly deviceService: LoginService,
    private readonly queryRunnerService: QueryRunnerService,
  ) {}

  //! 기기 아이디 저장하기
  @ApiOperation({ summary: '카카오 계정 저장하기' })
  @Post('kakaoid')
  async setDeviceId(@Body() body: LoginDto) {
    return await this.deviceService.setLoginId(body);
  }

  //! 유저 정보 삭제
  @ApiOperation({ summary: '유저 정보 삭제하기' })
  @Delete('deleteid')
  async deleteId(@Query('adid') adid: string) {
    await this.deviceService.deleteId(adid);
  }

  //! 유저 정보 검색
  @ApiOperation({ summary: '유저 정보 찾기' })
  @Get('finduser')
  async findUser(@Query('adid') adid: string) {
    return await this.deviceService.findAdid(adid);
  }
}
