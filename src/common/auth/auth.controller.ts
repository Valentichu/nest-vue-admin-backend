import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiOperation, ApiTags } from '@nestjs/swagger';


@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
    @ApiOperation({ summary: '登录' })
    @Post('login')
    @UseGuards(LocalAuthGuard)
    async login(@Request() req) {
        return req.user;
    }
}