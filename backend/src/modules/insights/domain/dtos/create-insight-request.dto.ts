import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInsightRequestDto {
  @ApiProperty({
    description: 'Title of the insight',
    example: 'My Insight Title',
  })
  @IsNotEmpty()
  readonly title: string;
}
