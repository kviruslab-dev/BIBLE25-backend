import { ApiProperty, PickType } from '@nestjs/swagger';
import { Cat } from '../cat.entity';

export class MyinfoResponseDto extends PickType(Cat, ['email', 'name'] as const) {
  @ApiProperty({
    example: 1,
    description: 'id',
  })
  id: number;

  @ApiProperty({
    example: "https://raw.githubusercontent.com/bobpull/bobpull/master/front/build/img/pull.png",
    description: 'imgUrl',
  })
  imgUrl: string;
}
