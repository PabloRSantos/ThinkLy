import { JwtAdapterInterface } from '../../domain/infra/jwt.interface';

type TokensMock = {
  [key: string]: JwtAdapterInterface.Payload;
};

export class JwtMock implements JwtAdapterInterface {
  calls: any[] = [];
  tokens: TokensMock = {};

  sign(payload: JwtAdapterInterface.Payload): string {
    const token = crypto.randomUUID();
    this.calls.push({
      method: 'sign',
      params: payload,
    });
    this.tokens[token] = payload;

    return token;
  }
  verify(token: string): JwtAdapterInterface.Payload {
    this.calls.push({
      method: 'verify',
      params: { token },
    });

    const payload = this.tokens[token];

    if (!payload) throw new Error();

    return payload;
  }
}
