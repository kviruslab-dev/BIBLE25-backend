import { ConflictException, Injectable } from '@nestjs/common';

import { MailerService } from '@nestjs-modules/mailer';
import { InquiryDto } from './dtos/inquiry.dto';

@Injectable()
export class InquiryService {
  constructor(private readonly mailerService: MailerService) {}

  async createInquiry(data: InquiryDto) {
    this.mailerService
      .sendMail({
        to: 'givemeprice@naver.com',
        from: 'givemeprice@naver.com',
        subject: `바이블25 수정/요청사항 (작성자: ${data.name})`,
        text: ``,
        html: `
        <b>[이름] ${data.name},</b><br>
        <b>[전화번호] ${data.phone},</b><br>
        <b>[내용] ${data.comment}</b>
        `,
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        new ConflictException(error);
      });
    return true;
  }
}
