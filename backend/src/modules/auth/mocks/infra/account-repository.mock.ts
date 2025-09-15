import { UserModel } from '../../domain/models/user.model';
import { UserRepositoryInterface } from '../../domain/repositories/user.repository';

export class UserRepositoryMock implements UserRepositoryInterface {
  deleteById(id: number): Promise<void> {
    throw new Error('Method not implemented.');
  }
  updateById(
    id: number,
    payload: Partial<Omit<UserModel, 'id'>>,
  ): Promise<void> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<UserModel | null> {
    throw new Error('Method not implemented.');
  }
  calls: any[] = [];
  db: UserModel[] = [];
  lastId = 1;

  create(payload: UserModel): Promise<UserModel> {
    this.calls.push({
      method: 'create',
      params: payload,
    });

    payload.id = this.lastId++;
    this.db.push(payload);

    return Promise.resolve(payload);
  }

  findByEmail(email: string): Promise<UserModel | null> {
    this.calls.push({
      method: 'findByCpf',
      params: { email },
    });

    const user = this.db.find((user) => user.email === email);

    return Promise.resolve(user || null);
  }
}
