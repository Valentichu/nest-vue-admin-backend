import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

@Entity()
export class Role extends BaseEntity {
  @Column()
  name: string
}
