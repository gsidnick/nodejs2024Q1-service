import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { SALT } from 'src/constants';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { login: createUserDto.login },
    });

    if (user) {
      throw new UnprocessableEntityException();
    }

    const hash = await bcrypt.hash(createUserDto.password, SALT);
    const createdUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hash },
    });
    return new User(createdUser);
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user) => new User(user));
  }

  async findOneById(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return new User(user);
  }

  async findOneByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { login } });

    if (!user) {
      throw new ForbiddenException();
    }

    return new User(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    const isPasswordEqual = await bcrypt.compare(
      updatePasswordDto.oldPassword,
      user.password,
    );

    if (!isPasswordEqual) {
      throw new ForbiddenException();
    }

    const hash = await bcrypt.hash(updatePasswordDto.newPassword, SALT);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hash,
        version: user.version + 1,
        updatedAt: new Date(Date.now()),
      },
    });

    return new User(updatedUser);
  }

  async remove(id: string): Promise<void> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    await this.prisma.user.delete({ where: { id } });
  }
}
