import { Body, Controller, Post } from '@nestjs/common';
import { SignUpRequestDto } from '../../domain/dtos/sign-up-request.dto';
import { SignUpUseCase } from './sign-up.usecase';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class SignUpController {
  constructor(private readonly signUpUseCase: SignUpUseCase) {}

  @Post('sign-up')
  async signUp(@Body() payload: SignUpRequestDto) {
    const response = await this.signUpUseCase.execute(payload);

    return response;
  }
}
