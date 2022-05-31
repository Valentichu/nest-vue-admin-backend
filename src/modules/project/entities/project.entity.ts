import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

@Entity()
export class Project extends BaseEntity {
  @Column()
  name: string

  @Column({ name: 'department_id' })
  departmentId: number

  @Column()
  principal: number

  users: number[]
}
