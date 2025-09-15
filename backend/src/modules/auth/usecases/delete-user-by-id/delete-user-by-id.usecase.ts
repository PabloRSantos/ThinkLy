import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../../infra/database/user.repository';
import { DeleteUserRequestDto } from '../../domain/dtos/delete-user-request.dto';
import { CryptographyAdapter } from '../../infra/cryptography/bcrypt.adapter';

@Injectable()
export class DeleteUserByIdUseCase {
  private readonly logger = new Logger(DeleteUserByIdUseCase.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly cryptography: CryptographyAdapter,
  ) {}

  async execute(userId: number, params: DeleteUserRequestDto): Promise<void> {
    this.logger.log(`executed with params: ${userId}`);
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User ${userId} not found`);
    }

    const passwordMatch = await this.cryptography.compare(
      params.password,
      user.password,
    );
    if (!passwordMatch) {
      throw new BadRequestException('Invalid password');
    }

    await this.userRepository.deleteById(userId);
  }
}
