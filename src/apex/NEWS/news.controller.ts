import { Controller, Get, Req, UseInterceptors } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { NewsApiService } from './news.service';

@ApiTags('NEWS')
@Controller('news')
@UseInterceptors(SuccessInterceptor)
export class AppController {
  constructor(private readonly externalApiService: NewsApiService) {}

  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiOperation({ summary: '기독교뉴스 불러오기' })
  @Get('fetch-data')
  async fetchData(@Req() request: any): Promise<any> {
    try {
      const apiKey = request.headers['kdknews_fjsiejfl23847%^3()']; // API 키 추출

      if (!apiKey) {
        throw new Error('API 키가 필요합니다.');
      }

      const data = await this.externalApiService.fetchData(apiKey);
      return { success: true, data };
    } catch (error) {
      return {
        success: false,
        message: error.message || '데이터를 가져오는 중 에러 발생',
      };
    }
  }
}
