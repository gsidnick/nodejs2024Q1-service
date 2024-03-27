export class Tokens {
  accessToken: string;
  refreshToken: string;

  constructor(tokens: Partial<Tokens>) {
    Object.assign(this, tokens);
  }
}
