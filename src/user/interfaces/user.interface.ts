export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type CreateUserDto = Pick<User, 'login' | 'password'>;

export type AuthUserDto = Pick<User, 'login' | 'password'>;

export interface UpdateUserDto extends Pick<User, 'password' | 'version'> {
  updatedAt: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
