import { UserModel } from '../models/user.model';

export class SignUpResponseDto {
  user: UserModel;
  token: string;
}
