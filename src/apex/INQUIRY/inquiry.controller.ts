import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessInterceptor } from 'src/common/interceptors/success.interceptor';
import { InquiryDto } from './dtos/inquiry.dto';
import { InquiryService } from './inquiry.service';
import { CreateInquiryRes, ExistInquiryRes } from './ress/inquiry.res';

@ApiTags('INQUIRY')
@Controller('inquiry')
@UseInterceptors(SuccessInterceptor)
export class InquiryController {
  constructor(private readonly commentService: InquiryService) {}

  @ApiOperation({ summary: '수정/요청 사항 메일 보내기' })
  @ApiCreatedResponse({ description: '성공', type: CreateInquiryRes })
  @ApiOkResponse({ description: '성공', type: ExistInquiryRes })
  @Post()
  async createInquiry(@Body() body: InquiryDto) {
    return this.commentService.createInquiry(body);
  }
}
