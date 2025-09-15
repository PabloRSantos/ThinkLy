import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { JwtAdapterInterface } from '../../domain/infra/jwt.interface';

@Injectable()
export class JwtAdapter implements JwtAdapterInterface {
  constructor(private readonly configService: ConfigService) {}

  sign(payload: JwtAdapterInterface.Payload): string {
    const secret = this.configService.get<string>('JWT_SECRET');
    const expiration = this.configService.get<string>('JWT_EXPIRATION');

    return jwt.sign(payload, secret, { expiresIn: expiration });
  }

  verify(token: string): JwtAdapterInterface.Payload {
    const secret = this.configService.get<string>('JWT_SECRET');

    return jwt.verify(token, secret) as JwtAdapterInterface.Payload;
  }
}
