import { UpdatePasswordDto as IUpdatePasswordDto } from '../interfaces/user.interface';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}
