import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common/log/logger.instance';

@Injectable()
export class UserService {
  constructor(private readonly logger: Logger) {}

  getHello(): string {
    this.logger.error('测试日志');
    return 'Hello World1!';
  }
}
