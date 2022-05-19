import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common'
import { DepartmentService } from './department.service'
import { Department } from './entities/department.entity'

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  CurrentDepartmentId,
  CurrentUserId,
} from 'src/common/auth/current-user.decorator'
import { QueryListDto } from './dto/query-list.dto'
@ApiTags('部门模块')
@Controller('department')
export class DepartmentController {
  constructor(private readonly departmentService: DepartmentService) {}

  @ApiOperation({ summary: '新增' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createDto: Department) {
    return this.departmentService.create(createDto)
  }

  @ApiOperation({ summary: '查询列表' })
  @ApiBearerAuth()
  @Get()
  findAll(@Request() req) {
    return this.departmentService.findAll(req.user)
  }

  @ApiOperation({ summary: '查询详情' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.departmentService.findOne(+id)
  }

  @ApiOperation({ summary: '更新' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Department) {
    return this.departmentService.update(+id, updateDto)
  }

  @ApiOperation({ summary: '删除' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.departmentService.remove(+id)
  }
}
