import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { Role } from './entities/role.entity';
import { RolePage } from './entities/role-page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Role, RolePage])],
  exports: [TypeOrmModule],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
