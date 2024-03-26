import { IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto as ICreateUserDto } from '../interfaces/user.interface';

export class CreateUserDto implements ICreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}
