import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

@Entity()
export class ProjectLog extends BaseEntity {
  @Column({ name: 'project_id' })
  projectId: number

  @Column()
  description: string

  @Column()
  date: Date

  @Column()
  type: string
}
