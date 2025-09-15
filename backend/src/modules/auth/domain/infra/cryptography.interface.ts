export type CryptographyAdapterInterface = {
  compare(value: string, hash: string): Promise<boolean>;
  hash(value: string, salt?: number): Promise<string>;
};
