
export type UserModel = {
  id: number;
  name: string;
  email: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  password: string;
}
