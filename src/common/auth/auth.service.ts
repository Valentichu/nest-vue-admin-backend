import { Injectable } from '@nestjs/common';
import { UserService } from 'src/modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      const payload = {
        username: user.username,
        sub: user.id,
      };
      const access_token = this.jwtService.sign(payload);
      return {
        ...result,
        access_token,
      };
    }
    return null;
  }

  async getUserInfo(id: number): Promise<any> {
    const user = await this.userService.findOne(id);
    return user;
  }
}
