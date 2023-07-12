import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cat.entity';

export class ReadOnlyCatDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;
}
