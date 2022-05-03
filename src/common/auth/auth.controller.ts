import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator'

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: '登录' })
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Request() req) {
    return req.user;
  }
}
