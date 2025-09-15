import { Exclude } from 'class-transformer';

export class UserModel {
  id: number;
  name: string;
  email: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;

  @Exclude()
  password: string;
}
