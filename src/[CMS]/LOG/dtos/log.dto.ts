import { PickType } from '@nestjs/swagger';
import { ErrorLog } from 'src/common/entities/errorlog.entity';

export class ErrorLogDto extends PickType(ErrorLog, [
  'status_code',
  'method',
  'url',
  'error',
]) {}
