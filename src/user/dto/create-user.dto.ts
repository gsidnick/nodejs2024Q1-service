import { CreateUserDto as ICreateUserDto } from '../interfaces/user.interface';

export class CreateUserDto implements ICreateUserDto {
  login: string;
  password: string;
}
