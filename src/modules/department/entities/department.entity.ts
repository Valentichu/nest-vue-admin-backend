import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

@Entity()
export class Department extends BaseEntity {
  @Column()
  name: string

  @Column({ name: 'parent_id' })
  parentId: number
}
