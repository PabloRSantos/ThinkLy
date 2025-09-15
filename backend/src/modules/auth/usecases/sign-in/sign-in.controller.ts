import { Body, Controller, Post } from '@nestjs/common';
import { SignInRequestDto } from '../../domain/dtos/sign-in-request.dto';
import { SignInUseCase } from './sign-in.usecase';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth')
export class SignInController {
  constructor(private readonly signInUseCase: SignInUseCase) {}

  @Post('sign-in')
  async signIn(@Body() payload: SignInRequestDto) {
    const response = await this.signInUseCase.execute(payload);

    return response;
  }
}
