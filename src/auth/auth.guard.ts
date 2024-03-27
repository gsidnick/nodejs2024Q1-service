import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SECRET_KEY } from 'src/constants';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext) {
    try {
      const request = context.switchToHttp().getRequest();
      const { authorization } = request.headers;
      const [key, value] = authorization.split(' ');

      if (key !== 'Bearer' || !value) {
        throw new UnauthorizedException();
      }

      const user = this.jwtService.verify(value, {
        secret: SECRET_KEY,
      });
      request.user = user;

      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
