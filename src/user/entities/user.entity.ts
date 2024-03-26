import { Exclude, Transform } from 'class-transformer';

export class User {
  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  @Transform(({ value }) => +value)
  createdAt: Date;
  @Transform(({ value }) => +value)
  updatedAt: Date;

  constructor(user: Partial<User>) {
    Object.assign(this, user);
  }
}
