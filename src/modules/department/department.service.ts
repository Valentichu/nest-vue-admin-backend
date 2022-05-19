import { Injectable } from '@nestjs/common'
import { CommonLoggerService } from 'src/common/log/logger.instance'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Department } from './entities/department.entity'
import { ConfigService } from '@nestjs/config'
import { User } from '../user/entities/user.entity'

@Injectable()
export class DepartmentService {
  constructor(
    private readonly commonLoggerService: CommonLoggerService,
    private readonly configService: ConfigService,

    @InjectRepository(Department)
    private repository: Repository<Department>
  ) {}

  async create(entity: Department) {
    await this.repository.insert(entity)
  }

  async findAll(currentUser: User) {
    const allDepartment = await this.repository.find()
    const currentDepartment = await this.findOne(currentUser.departmentId)
    const departmentMap = {}
    allDepartment.forEach((department) => {
      if (!departmentMap[department.parentId])
        departmentMap[department.parentId] = []
      departmentMap[department.parentId].push(department)
    })
    let departmentTree
    if (currentUser.roleId === this.configService.get<number>('rootRoleId')) {
      departmentTree = departmentMap[0]
    } else {
      departmentTree = [currentDepartment]
    }
    this.getChildren(departmentTree, departmentMap)
    return departmentTree
  }

  getChildren(parent, map) {
    parent.forEach((item) => {
      item.children = map[item.id] ?? null
      if (item.children) this.getChildren(item.children, map)
    })
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id })
  }

  async update(id: number, entity: Department) {
    await this.repository.save(entity)
  }

  async remove(id: number) {
    await this.repository.delete(id)
  }
}
