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
import { isUUID } from 'class-validator';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    if (
      !(Object.keys(createUserDto).length === 2) ||
      createUserDto.login === null ||
      createUserDto.password === null
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const user = this.userService.create(createUserDto);
    res.status(HttpStatus.CREATED).json(user).send();
  }

  @Get()
  findAll(@Res() res: Response) {
    const users = this.userService.findAll();
    res.status(HttpStatus.OK).json(users).send();
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const user = this.userService.findOne(id);

    if (user) {
      res.status(HttpStatus.OK).json(user).send();
      return;
    }

    res.status(HttpStatus.NOT_FOUND).send();
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: Response,
  ) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    if (
      !(
        Object.keys(updateUserDto).length === 2 &&
        'oldPassword' in updateUserDto &&
        'newPassword' in updateUserDto
      )
    ) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const user = this.userService.findOne(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    if (user.password !== updateUserDto.oldPassword) {
      res.status(HttpStatus.FORBIDDEN).send();
      return;
    }

    const updated = this.userService.update(id, updateUserDto);
    res.status(HttpStatus.OK).json(updated).send();
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Res() res: Response) {
    if (!isUUID(id)) {
      res.status(HttpStatus.BAD_REQUEST).send();
      return;
    }

    const user = this.userService.findOne(id);

    if (!user) {
      res.status(HttpStatus.NOT_FOUND).send();
      return;
    }

    this.userService.remove(id);
    res.status(HttpStatus.NO_CONTENT).send();
  }
}
