import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Backend is running ...';
  }

  getData(
    request: Request,
    body: object,
    param: number,
    query: string,
  ): object {
    console.log('request :', request);
    return { data: { body, param, query } };
  }
}
