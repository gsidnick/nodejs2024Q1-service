import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { isString, isUUID } from 'class-validator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './interfaces/user.interface';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (
      !(
        Object.keys(createUserDto).length === 2 &&
        'login' in createUserDto &&
        'password' in createUserDto
      ) ||
      !isString(createUserDto.login) ||
      !isString(createUserDto.password)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const createdUser = await this.userService.create(createUserDto);
    const userForResponse: Omit<User, 'password'> = {
      id: createdUser.id,
      login: createdUser.login,
      version: createdUser.version,
      createdAt: createdUser.createdAt.getTime(),
      updatedAt: createdUser.updatedAt.getTime(),
    };

    res.status(HttpStatus.CREATED).json(userForResponse).send();
  }

  @Get()
  async findAll(@Res() res: Response) {
    const users = await this.userService.findAll();
    const usersForResponse: Omit<User, 'password'>[] = [...users].map(
      (user) => {
        return {
          id: user.id,
          login: user.login,
          version: user.version,
          createdAt: user.createdAt.getTime(),
          updatedAt: user.updatedAt.getTime(),
        };
      },
    );

    res.status(HttpStatus.OK).json(usersForResponse).send();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const user = await this.userService.findOne(id);

    if (!user) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    const userForResponse: Omit<User, 'password'> = {
      id: user.id,
      login: user.login,
      version: user.version,
      createdAt: user.createdAt.getTime(),
      updatedAt: user.updatedAt.getTime(),
    };

    res.status(HttpStatus.OK).json(userForResponse).send();
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    if (
      !(
        Object.keys(updatePasswordDto).length === 2 &&
        'oldPassword' in updatePasswordDto &&
        'newPassword' in updatePasswordDto
      ) ||
      !isString(updatePasswordDto.oldPassword) ||
      !isString(updatePasswordDto.newPassword)
    ) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const user = await this.userService.findOne(id);

    if (!user) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      const error = {
        statusCode: HttpStatus.FORBIDDEN,
        message: 'Forbidden',
      };

      res.status(HttpStatus.FORBIDDEN).json(error).send();
      return;
    }

    const updateUserDto: UpdateUserDto = {
      password: updatePasswordDto.newPassword,
      version: user.version + 1,
      updatedAt: new Date(Date.now()).toISOString(),
    };

    const updatedUser = await this.userService.update(id, updateUserDto);
    const userForResponse: Omit<User, 'password'> = {
      id: updatedUser.id,
      login: updatedUser.login,
      version: updatedUser.version,
      createdAt: updatedUser.createdAt.getTime(),
      updatedAt: updatedUser.updatedAt.getTime(),
    };

    res.status(HttpStatus.OK).json(userForResponse).send();
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      const error = {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Bad request',
      };

      res.status(HttpStatus.BAD_REQUEST).json(error).send();
      return;
    }

    const user = await this.userService.findOne(id);

    if (!user) {
      const error = {
        statusCode: HttpStatus.NOT_FOUND,
        message: 'Not found',
      };

      res.status(HttpStatus.NOT_FOUND).json(error).send();
      return;
    }

    await this.userService.remove(id);

    res.status(HttpStatus.NO_CONTENT).send();
  }
}
