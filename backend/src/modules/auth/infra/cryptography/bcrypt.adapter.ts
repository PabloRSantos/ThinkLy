import { Injectable } from '@nestjs/common';
import bcrypt from 'bcrypt';
import { CryptographyAdapterInterface } from '../../domain/infra/cryptography.interface';

@Injectable()
export class CryptographyAdapter implements CryptographyAdapterInterface {
  async compare(value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash);

    return isValid;
  }

  async hash(value: string, salt = 12): Promise<string> {
    const hash = await bcrypt.hash(value, salt);

    return hash;
  }
}
