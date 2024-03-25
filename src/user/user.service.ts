import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './interfaces/user.interface';
import database from '../database';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto): User {
    return database.createUser(createUserDto);
  }

  findAll(): User[] {
    return database.getUsers();
  }

  findOne(id: string): User {
    return database.getUser(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    return database.updateUser(id, updateUserDto);
  }

  remove(id: string): void {
    database.deleteUser(id);
  }
}
