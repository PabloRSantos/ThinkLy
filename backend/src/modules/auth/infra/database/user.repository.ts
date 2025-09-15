import { PrismaConnector } from '@/common/database/connection';
import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { UserModel } from '../../domain/models/user.model';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository';

@Injectable()
export class UserRepository implements UserRepositoryInterface {
  constructor(private db: PrismaConnector) {}

  async create(payload: Omit<UserModel, 'id'>): Promise<UserModel> {
    const user = await this.db.user.create({ data: payload });

    return plainToClass(UserModel, user);
  }

  async deleteById(id: number): Promise<void> {
    await this.db.user.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateById(
    id: number,
    payload: Partial<Omit<UserModel, 'id'>>,
  ): Promise<void> {
    await this.db.user.update({
      where: { id, deletedAt: null },
      data: payload,
    });
  }

  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.db.user.findFirst({
      where: { email, deletedAt: null },
    });

    if (!user) return null;

    return plainToClass(UserModel, user, { ignoreDecorators: true });
  }

  async findById(id: number): Promise<UserModel | null> {
    const user = await this.db.user.findFirst({
      where: { id, deletedAt: null },
    });

    if (!user) return null;

    return plainToClass(UserModel, user, { ignoreDecorators: true });
  }
}
