import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PageService } from './page.service';
import { Page } from './entities/page.entity';

import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  CurrentDepartmentId,
  CurrentUserId,
} from 'src/common/auth/current-user.decorator';
@ApiTags('页面模块')
@Controller('user')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @ApiOperation({ summary: '新增' })
  @ApiBearerAuth()
  @Post()
  create(@Body() createDto: Page) {
    return this.pageService.create(createDto);
  }

  @ApiOperation({ summary: '查询列表' })
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.pageService.findAll();
  }

  @ApiOperation({ summary: '查询详情' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pageService.findOne(+id);
  }

  @ApiOperation({ summary: '更新' })
  @ApiBearerAuth()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: Page) {
    return this.pageService.update(+id, updateDto);
  }

  @ApiOperation({ summary: '删除' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pageService.remove(+id);
  }
}
