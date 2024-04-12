import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NewsApiService {
  async fetchData(apiKey: string): Promise<any> {
    try {
      const response = await axios.get(
        'https://www.kdknews.com/news/articleApi.php',
        {
          headers: {
            Authorization: `${apiKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      // 에러 처리
      console.error('데이터를 가져오는 중 에러 발생:', error);
      throw error;
    }
  }
}
