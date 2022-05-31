import { Injectable } from '@nestjs/common'
import { CommonLoggerService } from 'src/common/log/logger.instance'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { Project } from './entities/project.entity'
import { ProjectUser } from './entities/project-user.entity'
import { QueryListDto } from './dto/query-list.dto'
import { PageResultData } from 'src/common/data/result'

@Injectable()
export class ProjectService {
  constructor(
    private readonly commonLoggerService: CommonLoggerService,

    @InjectRepository(Project)
    private projectRepository: Repository<Project>,

    @InjectRepository(ProjectUser)
    private projectUserRepository: Repository<ProjectUser>
  ) {}

  async create(entity: Project) {
    await this.projectRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const project: Project = await transactionalEntityManager.save(
          this.projectRepository.manager.create(Project, entity)
        )
        await transactionalEntityManager.save(
          entity.users.map((userId) => {
            return this.projectRepository.manager.create(ProjectUser, {
              userId,
              projectId: project.id,
            })
          })
        )
      }
    )
  }

  async findAll(dto: QueryListDto) {
    const { page, size, name, departmentId } = dto
    const where = {
      ...(departmentId ? { departmentId } : null),
      ...(name ? { name: Like(`%${name}%`) } : null),
    }
    const [list, total] = await this.projectRepository.findAndCount({
      where,
      order: { id: 'DESC' },
      skip: size * (page - 1),
      take: size,
    })
    return new PageResultData(list, total)
  }

  async findOne(id: number) {
    const project = await this.projectRepository.findOneBy({ id })
    const users = await this.projectUserRepository.find({
      where: {
        projectId: id,
      },
    })
    project.users = users.map((item) => item.userId)
    return project
  }

  async update(id: number, entity: Project) {
    await this.projectRepository.manager.transaction(
      async (transactionalEntityManager) => {
        const project: Project = await transactionalEntityManager.save(
          this.projectRepository.manager.create(Project, entity)
        )
        await transactionalEntityManager.save(
          entity.users.map((userId) => {
            return this.projectRepository.manager.create(ProjectUser, {
              userId,
              projectId: project.id,
            })
          })
        )
      }
    )
    await this.projectRepository.manager.transaction(
      async (transactionalEntityManager) => {
        await transactionalEntityManager.save(
          this.projectRepository.manager.create(Project, entity)
        )
        await transactionalEntityManager.delete(ProjectUser, {
          projectId: id,
        })
        await transactionalEntityManager.save(
          entity.users.map((userId) => {
            return this.projectRepository.manager.create(ProjectUser, {
              userId,
              projectId: id,
            })
          })
        )
      }
    )
  }

  async remove(id: number) {
    await this.projectRepository.delete(id)
  }
}
