import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class UpdateDto {
  @ApiProperty({
    example: ['start_date', 'end_date', 'note', 'rate'],
    description: 'columns',
    required: true,
  })
  @IsArray()
  columns: string[];

  @ApiProperty({
    example: ['2023-10-01', '2025-10-01', '테스트', 5],
    required: true,
  })
  @IsArray()
  values: any[];

  @ApiProperty({
    example: [484, 485, 486],
    description: 'id',
    required: true,
  })
  @IsArray()
  id: number[];
}
