import { IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTopicRequestDto {
  @ApiProperty({ description: 'Text of the topic', example: 'Some topic text' })
  @IsNotEmpty()
  readonly text: string;

  @ApiProperty({ description: 'ID of the related insight', example: 123 })
  @IsNotEmpty()
  @IsPositive()
  readonly insightId: number;

  @ApiProperty({ description: 'Latitude coordinate', example: '-34.6037' })
  readonly latitude: string;

  @ApiProperty({ description: 'Longitude coordinate', example: '-58.3816' })
  readonly longitude: string;
}
