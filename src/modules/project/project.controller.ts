import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common'
import { ProjectService } from './project.service'
import { Project } from './entities/project.entity'

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger'
import {
  CurrentDepartmentId,
  CurrentUserId,
} from 'src/common/auth/current-user.decorator'
import { QueryListDto } from './dto/query-list.dto'
@ApiTags('项目模块')
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiOperation({ summary: '新增' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createUserDto: Project) {
    return this.projectService.create(createUserDto)
  }

  @ApiOperation({ summary: '查询列表' })
  @ApiBearerAuth()
  @Get()
  findAll(@Query() dto: QueryListDto) {
    return this.projectService.findAll(dto)
  }

  @ApiOperation({ summary: '查询详情' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id)
  }

  @ApiOperation({ summary: '更新' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: Project) {
    return this.projectService.update(+id, updateUserDto)
  }

  @ApiOperation({ summary: '删除' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectService.remove(+id)
  }
}
