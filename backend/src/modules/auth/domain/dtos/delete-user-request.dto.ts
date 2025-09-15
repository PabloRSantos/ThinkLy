import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteUserRequestDto {
  @ApiProperty({ example: 'StrongP@ssw0rd!', description: 'User password' })
  @IsNotEmpty()
  readonly password: string;
}
