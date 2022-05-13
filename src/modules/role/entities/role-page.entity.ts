import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

@Entity()
export class RolePage extends BaseEntity {
  @Column({ name: 'role_id' })
  roleId: number

  roleName: string

  @Column({ name: 'page_id' })
  pageId: number

  @Column()
  create: boolean

  @Column()
  retrieve: boolean

  @Column()
  update: boolean

  @Column()
  delete: boolean
}
