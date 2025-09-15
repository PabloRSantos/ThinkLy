import { UserModel } from '../models/user.model';

export type JwtAdapterInterface = {
  sign(payload: JwtAdapterInterface.Payload): string;
  verify(token: string): JwtAdapterInterface.Payload;
};

export namespace JwtAdapterInterface {
  export type Payload = Pick<UserModel, 'id' | 'name' | 'email'>;
}
