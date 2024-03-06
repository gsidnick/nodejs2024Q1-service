import { v4 as uuid4 } from 'uuid';
import { User } from './user/interfaces/user.interface';
import { CreateUserDto } from './user/dto/create-user.dto';
import { UpdateUserDto } from './user/dto/update-user.dto';

interface DB {
  users: User[];
}

export class Database {
  static instance: Database;

  private db: DB;

  constructor() {
    this.db = {
      users: [],
    };
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  public getUsers(): User[] {
    return this.db.users;
  }

  public getUser(id: string): User {
    return this.db.users.find((user) => user.id === id);
  }

  public createUser(createUserDto: CreateUserDto): User {
    const date = Date.now();
    const user: User = {
      id: uuid4(),
      ...createUserDto,
      version: 1,
      createdAt: date,
      updatedAt: date,
    };

    this.db.users = [...this.db.users, user];

    const userForResponse = { ...user };
    delete userForResponse.password;
    return userForResponse;
  }

  public updateUser(id: string, updateUserDto: UpdateUserDto): User {
    const user = this.getUser(id);
    const index = this.db.users.findIndex((user) => user.id === id);
    const updatedUser: User = {
      ...user,
      password: updateUserDto.newPassword,
      version: user.version + 1,
      updatedAt: Date.now(),
    };

    this.db.users[index] = updatedUser;

    const userForResponse = { ...updatedUser };
    delete userForResponse.password;
    return userForResponse;
  }

  public deleteUser(id: string): User {
    const index = this.db.users.findIndex((user) => user.id === id);
    const user = this.db.users[index];
    this.db.users.splice(index, 1);
    return user;
  }
}

export default Database.getInstance();
