import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common/log/logger.instance';

@Injectable()
export class UserService {
  constructor(private readonly logger: Logger) {}

  getHello(): string {
    throw new Error('测试报错')
    this.logger.error('测试日志');
    return 'Hello World1!';
  }
}
