export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface CreateUserDto {
  login: string;
  password: string;
}

export interface UpdateUserDto {
  password: string;
  version: number;
  updatedAt: string;
}

export interface UpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
