import { ApiProperty } from '@nestjs/swagger'
import { PageQuery } from 'src/common/dto/page-query.dto'

export class QueryListDto extends PageQuery {
  @ApiProperty({ description: '顶节点id', required: false })
  id?: number
}
