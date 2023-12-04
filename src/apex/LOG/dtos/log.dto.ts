import { ErrorLog } from 'src/common/entities/errorlog.entity';
import { PickType } from '@nestjs/swagger';

export class ErrorLogDto extends PickType(ErrorLog, [
  'status_code',
  'method',
  'url',
  'query',
  'body',
  'error',
]) {}
