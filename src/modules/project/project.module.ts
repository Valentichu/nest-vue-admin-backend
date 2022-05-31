import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'
import { Project } from './entities/project.entity'
import { ProjectUser } from './entities/project-user.entity'
import { ProjectLog } from './entities/project-log.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectUser, ProjectLog])],
  exports: [ProjectService],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
