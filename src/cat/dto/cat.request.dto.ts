import { PickType } from '@nestjs/swagger';
import { Cat } from '../cat.entity';

export class CatRequestDto extends PickType(Cat, [
  'email',
  'name',
  'password',
] as const) {}
