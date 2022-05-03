import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const isPublic =
      this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) ?? false;
    if (isPublic) {
      return true;
    }
    if (super.canActivate(context)) {
      // 自动续期
      const req = context.switchToHttp().getRequest();
      const res = context.switchToHttp().getResponse();
      const accessToken = req.get('Authorization');
      const { iat, exp, ...payload } = this.jwtService.verify(
        accessToken.replace('Bearer ', ''),
      );
      const access_token = this.jwtService.sign(payload);
      res.setHeader('Authorization', access_token);
      return true;
    }
    return false;
  }
}
