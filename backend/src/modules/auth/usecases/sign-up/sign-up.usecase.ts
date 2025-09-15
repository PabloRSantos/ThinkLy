import { ConflictException, Injectable } from '@nestjs/common';
import { SignUpRequestDto } from '../../domain/dtos/sign-up-request.dto';
import { SignUpResponseDto } from '../../domain/dtos/sign-up-response.dto';
import { UserRepository } from '../../infra/database/user.repository';
import { CryptographyAdapter } from '../../infra/cryptography/bcrypt.adapter';
import { JwtAdapter } from '../../infra/jwt/jwt.adapter';

@Injectable()
export class SignUpUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
    private readonly jwt: JwtAdapter,
  ) {}

  async execute(params: SignUpRequestDto): Promise<SignUpResponseDto> {
    const userAlreadyExists = await this.userRepository.findByEmail(
      params.email,
    );

    if (userAlreadyExists) {
      throw new ConflictException('User already exists');
    }

    const passwordHash = await this.cryptography.hash(params.password);

    const user = await this.userRepository.create({
      name: params.name,
      email: params.email,
      photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg',
      password: passwordHash,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const token = this.jwt.sign({
      id: user.id,
      name: user.name,
      email: user.email,
    });

    return {
      user,
      token,
    };
  }
}
