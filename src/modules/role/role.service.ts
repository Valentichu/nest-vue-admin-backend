import { Injectable } from '@nestjs/common';
import { Logger } from 'src/common/log/logger.instance';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';

@Injectable()
export class RoleService {
  constructor(
    private readonly logger: Logger,

    @InjectRepository(Role)
    private RolesRepository: Repository<Role>,
  ) {}

  async create(entity: Role) {
    await this.RolesRepository.insert(entity);
  }

  findAll() {
    return this.RolesRepository.find();
  }

  findOne(id: number) {
    return this.RolesRepository.findOneBy({ id });
  }

  async update(id: number, entity: Role) {
    await this.RolesRepository.save(entity);
  }

  async remove(id: number) {
    await this.RolesRepository.delete(id);
  }
}
