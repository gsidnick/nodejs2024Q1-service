import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AuthUserDto } from 'src/user/dto/auth-user.dto';
import { User } from 'src/user/entities/user.entity';
import {
  EXPIRE_TIME,
  REFRESH_EXPIRE_TIME,
  SECRET_KEY,
  SECRET_REFRESH_KEY,
} from 'src/constants';
import { Tokens } from './entities/tokens.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userService.create(createUserDto);
    return new User(user);
  }

  async login(authUserDto: AuthUserDto): Promise<Tokens> {
    const user = await this.userService.findOneByLogin(authUserDto.login);
    const isPasswordEqual = await bcrypt.compare(
      authUserDto.password,
      user.password,
    );

    if (!isPasswordEqual) {
      throw new ForbiddenException();
    }

    const payload = { userId: user.id, login: user.login };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: SECRET_KEY,
      expiresIn: EXPIRE_TIME,
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: SECRET_REFRESH_KEY,
      expiresIn: REFRESH_EXPIRE_TIME,
    });
    return new Tokens({ accessToken, refreshToken });
  }
}
