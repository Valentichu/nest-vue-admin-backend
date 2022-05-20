import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'

import { timeTransformer } from '../utils/date'

export abstract class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at', transformer: timeTransformer })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at', transformer: timeTransformer })
  updatedAt: Date
}
