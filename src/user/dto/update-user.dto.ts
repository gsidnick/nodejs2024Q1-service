import { UpdateUserDto as IUpdateUserDto } from '../interfaces/user.interface';

export class UpdateUserDto implements IUpdateUserDto {
  password: string;
  version: number;
  updatedAt: string;
}
