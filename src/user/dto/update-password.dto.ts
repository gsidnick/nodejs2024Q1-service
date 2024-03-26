import { IsNotEmpty, IsString } from 'class-validator';
import { UpdatePasswordDto as IUpdatePasswordDto } from '../interfaces/user.interface';

export class UpdatePasswordDto implements IUpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  oldPassword: string;
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
