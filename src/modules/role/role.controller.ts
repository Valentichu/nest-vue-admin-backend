import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
@ApiTags('角色模块')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiOperation({ summary: '新增' })
  @ApiBearerAuth()
  @Post()
  create(@Body() entity: Role) {
    return this.roleService.create(entity);
  }

  @ApiOperation({ summary: '查询列表' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.roleService.findAll();
  }

  @ApiOperation({ summary: '查询详情' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  @ApiOperation({ summary: '更新' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() entity: Role) {
    return this.roleService.update(+id, entity);
  }

  @ApiOperation({ summary: '删除' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(+id);
  }
}
