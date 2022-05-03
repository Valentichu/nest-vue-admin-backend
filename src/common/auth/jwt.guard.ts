import { ExecutionContext, Injectable, CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    constructor(private readonly reflector: Reflector) {
      super()
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler()) ?? false;
        if(isPublic) {
            return true
        }
        return super.canActivate(context);
    }
}
