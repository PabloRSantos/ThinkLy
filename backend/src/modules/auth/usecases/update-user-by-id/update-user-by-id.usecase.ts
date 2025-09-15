import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../infra/database/user.repository';
import { UpdateUserRequestDto } from '../../domain/dtos/update-user-request.dto';

@Injectable()
export class UpdateUserByIdUseCase {
  private readonly logger = new Logger(UpdateUserByIdUseCase.name);

  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: number, params: UpdateUserRequestDto): Promise<void> {
    this.logger.log(`received params: ${JSON.stringify(params)}`);

    if (!params.name && !params.email && !params.password) {
      throw new BadRequestException(
        'At least one field (name, email or password) must be provided',
      );
    }

    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    await this.userRepository.updateById(userId, params);
  }
}
