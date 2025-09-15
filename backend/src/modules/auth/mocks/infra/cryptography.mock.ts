export class CryptographyMock implements CryptographyMock {
  calls: any[] = [];

  compare(value: string, hash: string): Promise<boolean> {
    this.calls.push({
      method: 'compare',
      params: {
        value,
        hash,
      },
    });

    return Promise.resolve(value === hash);
  }

  hash(value: string, salt = 12): Promise<string> {
    this.calls.push({
      method: 'hash',
      params: {
        value,
        salt,
      },
    });

    return Promise.resolve('hashed_value');
  }
}
