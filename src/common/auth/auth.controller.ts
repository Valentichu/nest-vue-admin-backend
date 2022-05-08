import { Controller, Request, Post, Get, UseGuards, Body } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from './public.decorator';
import { LoginDto } from './dto/login.dto';

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
  @ApiOperation({ summary: '登录' })
  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto, @Request() req) {
    return req.user;
  }

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth()
  @Get('info')
  async getInfo(@Request() req) {
    return req.user;
  }
}
