import { PickType } from '@nestjs/swagger';
import { Cat } from 'src/cat/cat.entity';

export class LoginRequestDto extends PickType(Cat, [
  'email',
  'password',
] as const) {}
