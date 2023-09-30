import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { sendMessageToSlack } from '../utils/slackBot';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const error = exception.getResponse() as
      | string
      | {
          error: string;
          statusCode: number;
          message: string | string | string[];
        };

    if (typeof error === 'string') {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        data: {
          statusCode: status,
          message: `Cannot ${request.method} ${request.url}`,
          error,
        },
      });
      sendMessageToSlack(`
      🚨🚨🚨 STATUS CODE : ${status} 🚨🚨🚨
      오류 메세지 : Cannot ${request.method} ${request.url},
      ${error}
      `);
    } else {
      response.status(status).json({
        success: false,
        timestamp: new Date().toISOString(),
        data: { ...error },
      });

      sendMessageToSlack(`
      🚨🚨🚨 STATUS CODE : ${status} 🚨🚨🚨
      오류 메세지 : Cannot ${request.method} ${request.url},
      ${error.error}
      `);
    }
  }
}
