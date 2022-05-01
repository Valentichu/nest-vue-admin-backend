import { Injectable } from '@nestjs/common';
import { UserService } from '../../modules/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findOneByUsername(username);
        if (user && user.password === pass) {
            const { password, ...result } = user;
            const payload = { username: user.username, sub: user.id, dept: user.departmentId };
            const access_token = this.jwtService.sign(payload)
            return {
                ...result,
                access_token
            };
        }
        return null;
    }
}
