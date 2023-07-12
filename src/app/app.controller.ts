import {
  Controller,
  Get,
  Req,
  Body,
  Param,
  Query,
  HttpCode,
  Header,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // @Get('/practice/:param_key')
  // @HttpCode(200)
  // @Header('Cache-Control', 'none')
  // getData(
  //   @Req() request: Request,
  //   @Body() body: object,
  //   @Param() param: number,
  //   @Query() query: string,
  // ): object {
  //   return this.appService.getData(request, body, param, query);
  // }

  // @Get('/exception')
  // makeException() {
  //   throw new HttpException(
  //     'An Exception has occurred.',
  //     HttpStatus.UNAUTHORIZED,
  //   );
  // }
}
