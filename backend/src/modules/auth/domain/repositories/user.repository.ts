import { UserModel } from '../models/user.model';

export type UserRepositoryInterface = {
  create(payload: Omit<UserModel, 'id'>): Promise<UserModel>;
  deleteById(id: number): Promise<void>;
  updateById(
    id: number,
    payload: Partial<Omit<UserModel, 'id'>>,
  ): Promise<void>;
  findByEmail(email: string): Promise<UserModel | null>;
  findById(id: number): Promise<UserModel | null>;
};
