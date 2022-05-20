import { Injectable } from '@nestjs/common'
import { CommonLoggerService } from 'src/common/log/logger.instance'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { User } from './entities/user.entity'
import { QueryListDto } from './dto/query-list.dto'
import { PageResultData } from 'src/common/data/result'

@Injectable()
export class UserService {
  constructor(
    private readonly commonLoggerService: CommonLoggerService,

    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(entity: User) {
    await this.userRepository.insert(entity)
  }

  async findAll(dto: QueryListDto) {
    const { page, size, name, departmentId } = dto
    const where = {
      ...(departmentId ? { departmentId } : null),
      ...(name ? { name: Like(`%${name}%`) } : null),
    }
    const [list, total] = await this.userRepository.findAndCount({
      where,
      order: { id: 'DESC' },
      skip: size * (page - 1),
      take: size,
    })
    return new PageResultData(list, total)
  }

  findOne(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  async getInfo(id: number) {
    const user = await this.userRepository.findOneBy({ id })
    // const rolePages = await this.rolePageRepository
    //   .createQueryBuilder('rolePage')
    //   .leftJoinAndSelect(Role, 'role', 'rolePage.role_id = role.id')
    //   .leftJoinAndSelect(Page, 'page', 'rolePage.page_id = page.id')
    //   .where('rolePage.role_id = :roleId', { roleId: role.id })
    //   .getRawMany()
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
