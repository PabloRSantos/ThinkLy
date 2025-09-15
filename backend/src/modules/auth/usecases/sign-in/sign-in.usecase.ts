import { Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { SignInRequestDto } from '../../domain/dtos/sign-in-request.dto';
import { SignInResponseDto } from '../../domain/dtos/sign-in-response.dto';
import { UserModel } from '../../domain/models/user.model';
import { UserRepository } from '../../infra/database/user.repository';
import { CryptographyAdapter } from '../../infra/cryptography/bcrypt.adapter';
import { JwtAdapter } from '../../infra/jwt/jwt.adapter';

@Injectable()
export class SignInUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
    private readonly jwt: JwtAdapter,
  ) {}

  async execute(params: SignInRequestDto): Promise<SignInResponseDto> {
    const user = await this.userRepository.findByEmail(params.email);

    const passwordMatch =
      user && (await this.cryptography.compare(params.password, user.password));

    if (!user || !passwordMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user: plainToClass(UserModel, user),
      token,
    };
  }
}
