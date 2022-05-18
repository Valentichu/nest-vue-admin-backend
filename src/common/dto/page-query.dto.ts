import { ApiProperty } from '@nestjs/swagger'

export class PageQuery {
  @ApiProperty({ description: '页数', required: false })
  page: number

  @ApiProperty({ description: '页面size', required: false })
  size: number
}
