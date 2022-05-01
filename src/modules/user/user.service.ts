import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common/log/logger.instance';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(entity: User) {
    await this.usersRepository.insert(entity);
  }

  findAll() {
    return this.usersRepository.find();
  }

  findOne(id: number) {
    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, entity: User) {
    await this.usersRepository.save(entity);
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
