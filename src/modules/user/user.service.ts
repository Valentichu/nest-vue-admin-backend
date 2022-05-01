import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common/log/logger.instance';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) { }

  async insert(user: User): Promise<void> {
    await this.usersRepository.insert(user);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({});
  }

  async remove(id: number): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
