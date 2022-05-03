import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
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
      if (this.configService.get<boolean>('jwt.autoRefresh')) {
        const req = context.switchToHttp().getRequest();
        const accessToken = req.get('Authorization');
        const { iat, exp, ...payload } = this.jwtService.verify(
          accessToken.replace('Bearer ', ''),
        );
        const expiresIn = exp - +new Date() / 1000
        const minExpireIn = 60 * 60 * 2
        if (expiresIn <= minExpireIn) {
          const res = context.switchToHttp().getResponse();
          const access_token = this.jwtService.sign(payload);
          res.setHeader('Authorization', access_token);
        }
      }
      return true;
    }
    return false;
  }
}
