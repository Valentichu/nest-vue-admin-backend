import { ApiProperty } from '@nestjs/swagger'
import { PageQuery } from 'src/common/dto/page-query.dto'

export class QueryListDto extends PageQuery {
  @ApiProperty({ description: '名称模糊搜索', required: false })
  name?: string

  @ApiProperty({ description: '部门id', required: false })
  departmentId?: number
}
