import { Injectable } from '@nestjs/common'
import { CommonLoggerService } from 'src/common/log/logger.instance'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { Role } from 'src/modules/role/entities/role.entity'
import { Page } from 'src/modules/page/entities/page.entity'
import { RolePage } from 'src/modules/role/entities/role-page.entity'

@Injectable()
export class UserService {
  constructor(
    private readonly commonLoggerService: CommonLoggerService,

    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Page)
    private pageRepository: Repository<Page>,
    @InjectRepository(RolePage)
    private rolePageRepository: Repository<RolePage>
  ) {}

  async create(entity: User) {
    await this.userRepository.insert(entity)
  }

  findAll() {
    return this.userRepository.find()
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async getInfo(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    const role = await this.roleRepository.findOneBy({ id: user.roleId })
    user.roleName = role.name
    const rolePages = await this.rolePageRepository
      .createQueryBuilder('rolePage')
      .leftJoinAndSelect(Role, 'role', 'rolePage.role_id = role.id')
      .leftJoinAndSelect(Page, 'page', 'rolePage.page_id = page.id')
      .where('rolePage.role_id = :roleId', { roleId: role.id })
      .getRawMany()
    const permissions = []
    rolePages.forEach((rolePage) => {
      if (rolePage.rolePage_create)
        permissions.push(`${rolePage.page_name}:create`)
      if (rolePage.rolePage_retrieve)
        permissions.push(`${rolePage.page_name}:retrieve`)
      if (rolePage.rolePage_update)
        permissions.push(`${rolePage.page_name}:update`)
      if (rolePage.rolePage_delete)
        permissions.push(`${rolePage.page_name}:delete`)
    })
    user.permissions = permissions
    const { password, ...info } = user
    return info
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ username })
  }

  async update(id: number, entity: User) {
    await this.userRepository.save(entity)
  }

  async remove(id: number) {
    await this.userRepository.delete(id)
  }
}
