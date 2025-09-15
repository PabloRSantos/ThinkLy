import { IsEmail, IsOptional, IsStrongPassword } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRequestDto {
  @ApiProperty({ example: 'John Doe', description: 'User full name' })
  @IsOptional()
  readonly name: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'User email address',
  })
  @IsEmail()
  @IsOptional()
  readonly email: string;

  @ApiProperty({ example: 'StrongP@ssw0rd!', description: 'User password' })
  @IsStrongPassword()
  @IsOptional()
  readonly password: string;
}
