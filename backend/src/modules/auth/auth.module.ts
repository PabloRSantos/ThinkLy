import { PrismaConnector } from '@/common/database/connection';
import { Module } from '@nestjs/common';
import { SignInController } from './usecases/sign-in/sign-in.controller';
import { SignUpController } from './usecases/sign-up/sign-up.controller';
import { JwtAdapter } from './infra/jwt/jwt.adapter';
import { UserRepository } from './infra/database/user.repository';
import { CryptographyAdapter } from './infra/cryptography/bcrypt.adapter';
import { SignInUseCase } from './usecases/sign-in/sign-in.usecase';
import { SignUpUseCase } from './usecases/sign-up/sign-up.usecase';
import { DeleteUserByIdController } from './usecases/delete-user-by-id/delete-user-by-id.controller';
import { DeleteUserByIdUseCase } from './usecases/delete-user-by-id/delete-user-by-id.usecase';
import { UpdateUserByIdController } from './usecases/update-user-by-id/update-user-by-id.controller';
import { UpdateUserByIdUseCase } from './usecases/update-user-by-id/update-user-by-id.usecase';

@Module({
  controllers: [
    SignInController,
    SignUpController,
    DeleteUserByIdController,
    UpdateUserByIdController,
  ],
  providers: [
    PrismaConnector,
    UserRepository,
    CryptographyAdapter,
    JwtAdapter,
    SignInUseCase,
    SignUpUseCase,
    DeleteUserByIdUseCase,
    UpdateUserByIdUseCase,
  ],
  exports: [JwtAdapter],
})
export class AuthModule {}
