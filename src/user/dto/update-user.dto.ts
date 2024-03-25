import { UpdateUserDto as IUpdateUserDto } from '../interfaces/user.interface';

export class UpdateUserDto implements IUpdateUserDto {
  oldPassword: string;
  newPassword: string;
}
