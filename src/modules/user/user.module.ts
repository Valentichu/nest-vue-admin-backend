import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { User } from './entities/user.entity'
import { Page } from '../page/entities/page.entity'
import { Role } from '../role/entities/role.entity'
import { RolePage } from '../role/entities/role-page.entity'

@Module({
  imports: [TypeOrmModule.forFeature([User, Role, Page, RolePage])],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
