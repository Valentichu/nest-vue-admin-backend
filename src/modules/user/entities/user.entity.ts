import { Column, Entity, Unique } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

export type roleType = '' | 'admin' | 'user' | 'superAdmin'

import { dateTransformer, yearTransformer } from 'src/common/utils/date'

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  phone: string

  @Column()
  level: string

  @Column({
    nullable: true,
  })
  age: number

  @Column({
    name: 'employment_date',
    transformer: dateTransformer,
    nullable: true,
  })
  employmentDate: Date

  @Column({
    name: 'appointment_date',
    transformer: dateTransformer,
    nullable: true,
  })
  appointmentDate: Date

  @Column({
    name: 'promotion_date',
    transformer: yearTransformer,
    nullable: true,
  })
  promotionDate: Date

  @Column()
  education: string

  @Column({ name: 'professional_title' })
  professionalTitle: string

  @Column()
  kpi: boolean

  @Column({ name: 'role_name' })
  roleName: roleType

  @Column({ name: 'department_id', nullable: true })
  departmentId: number

  departmentName: string
}
