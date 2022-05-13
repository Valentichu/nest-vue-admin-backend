import { Column, Entity } from 'typeorm'
import { BaseEntity } from 'src/common/entities/base.entity'

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column()
  password: string

  @Column({ nullable: true })
  phone: string

  @Column({ nullable: true })
  remark: string

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  status: number

  @Column({ name: 'role_id', nullable: true })
  roleId: number

  roleName: string

  @Column({ name: 'department_id', nullable: true })
  departmentId: number

  departmentName: string

  permissions: string[]
}
