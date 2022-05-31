import { timeTransformer } from 'src/common/utils/date'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity()
export class ProjectUser {
  @PrimaryColumn({ name: 'project_id' })
  projectId: number

  @PrimaryColumn({ name: 'user_id' })
  userId: number

  @CreateDateColumn({ name: 'created_at', transformer: timeTransformer })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', transformer: timeTransformer })
  updatedAt: Date
}
