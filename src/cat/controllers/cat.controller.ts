import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Redirect,
  Req,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { CatService } from '../services/cat.service';
import { CatRequestDto } from '../dto/cat.request.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReadOnlyCatDto } from '../dto/cat.dto';
import { AuthService } from 'src/auth/auth.service';
import { LoginRequestDto } from 'src/auth/dto/login.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CurrentUser } from 'src/common/decorators/user.decorator';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/common/utils/multer.options';
import { Cat } from '../cat.entity';
import { LoginResponseDto } from '../dto/login.response.dto';
import { MyinfoResponseDto } from '../dto/myinfo.response.dto';
import { Request, Response } from 'express';

@ApiTags('Cat')
@Controller('cat')
@UseInterceptors(SuccessInterceptor)
// @UseFilters(HttpExceptionFilter)
export class CatController {
  constructor(
    private readonly catService: CatService,
    private readonly authService: AuthService,
  ) {}

  // 1. 회원가입
  @ApiResponse({
    status: 200,
    description: '요청 성공',
    type: ReadOnlyCatDto,
  })
  @ApiResponse({
    status: 401,
    description: '이미 회원가입 되어있는 이메일입니다.',
  })
  @ApiOperation({ summary: '회원가입' })
  @Post()
  async signUp(@Body() body: CatRequestDto) {
    return await this.catService.signUp(body);
  }

  // 2. 로그인
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: LoginResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: '이메일과 비밀번호를 확인해주세요.',
  })
  @ApiOperation({ summary: '로그인' })
  @Post('login')
  logIn(@Body() data: LoginRequestDto) {
    return this.authService.jwtLogin(data);
  }

  // 3. 이미지 업로드
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '고양이 이미지 업로드' })
  @UseInterceptors(FilesInterceptor('image', 10, multerOptions('cat')))
  @UseGuards(JwtAuthGuard)
  @Post('upload')
  uploadCatImg(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @CurrentUser() cat: Cat,
  ) {
    console.log(files);
    return this.catService.uploadImg(cat, files);
  }

  // 4. 현재 회원 정보 가져오기
  @ApiResponse({
    status: 200,
    description: '회원 정보 가져오기 성공',
    type: MyinfoResponseDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: '현재 고양이 정보 가져오기' })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrentCat(@CurrentUser() cat: object) {
    return cat;
  }

  @Get('testredirect')
  @Redirect('http://localhost:5000/cat/redirecturl')
  testRedirect(){
    return "testRedirect"
  }
  
  @Post('refererurl')
    async registProduct(@Res() response: Response) {
    response.redirect(HttpStatus.PERMANENT_REDIRECT, 'http://localhost:5000/cat/redirecturl');
  }

  @Post('redirecturl')
  redirectUrl(@Req() request: Request) {
    const refererUrl = request.headers.referer;
    const redirectUrl = request.originalUrl;
    const data = request.body;
    return {refererUrl, redirectUrl, data};
  }
}