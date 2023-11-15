import * as CryptoJS from 'crypto';

import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { QueryRunnerService } from 'src/queryrunner/queryrunner.service';
import { CreateSmsDto } from './dtos/sms-create.dto';

@Injectable()
export class SmsService {
  constructor(private readonly queryRunnerService: QueryRunnerService) {}

  async sendMessage(messageInfo: CreateSmsDto) {
    const scretKey = 'gSOAEKTsbJV8eg5oo8PyTHz0xtynjdA4UdI37F1q';
    const accessKeyId = '8gWnEhvDScazjZkiPyzI';
    const uri = 'ncp:sms:kr:292220535709:givemeprice';

    const user_phone_number = messageInfo.receiver;
    const date = Date.now().toString();

    const method = 'POST';
    const space = ' ';
    const newLine = '\n';
    const url = `https://sens.apigw.ntruss.com/sms/v2/services/${uri}/messages`;
    const url2 = `/sms/v2/services/${uri}/messages`;
    const adminPhoneNumber = '01080301000';

    const hmac = CryptoJS.createHmac('sha256', scretKey);
    hmac.update(method);
    hmac.update(space);
    hmac.update(url2);
    hmac.update(newLine);
    hmac.update(date);
    hmac.update(newLine);
    hmac.update(accessKeyId);
    const signature = hmac.digest('base64');

    const options = {
      headers: {
        'Contenc-type': 'application/json; charset=utf-8',
        'x-ncp-iam-access-key': accessKeyId,
        'x-ncp-apigw-timestamp': date,
        'x-ncp-apigw-signature-v2': signature,
      },
    };

    const content = `[BIBLE25 제휴문의]
    이름: ${messageInfo.senderName},
    전화번호: ${messageInfo.senderPhone},
    내용: ${messageInfo.senderContent}
    `;

    const body = {
      type: 'MMS',
      countryCode: '82',
      from: adminPhoneNumber,
      content,
      messages: [{ to: `${user_phone_number}` }],
    };

    await axios.post(url, body, options);

    const condition = {
      table: 'contact',
      columns: 'name, phone, content, extra',
      values: `'${messageInfo.senderName}', '${messageInfo.senderPhone} ', '${messageInfo.senderContent}', '${messageInfo.receiver}'`,
    };

    await this.queryRunnerService.insert(condition);

    return {
      code: 1000,
      message: 'complete',
      time: Date(),
    };
  }

  splitString(str: string, chunkSize: number) {
    const chunks = [];
    for (let i = 0; i < str.length; i += chunkSize) {
      chunks.push(str.substring(i, i + chunkSize));
    }
    return chunks;
  }
}
