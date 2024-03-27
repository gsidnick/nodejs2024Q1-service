import { IsNotEmpty, IsString } from 'class-validator';
import { AuthUserDto as IAuthUserDto } from '../interfaces/user.interface';

export class AuthUserDto implements IAuthUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
