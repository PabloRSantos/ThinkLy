import { UserModel } from '../models/user.model';

export class SignInResponseDto {
  readonly user: UserModel;
  readonly token: string;
}
