import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base.entity';
import { Role } from '../../role/entities/role.entity'

@Entity({ name: 't_user' })
export class User extends BaseEntity {
  @Column({ name: 'department_id', nullable: true })
  @ApiProperty()
  departmentId: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column({ unique: true })
  @ApiProperty()
  username: string;

  @Column()
  @ApiProperty()
  password: string;

  @Column({ nullable: true })
  @ApiProperty()
  phone: string;

  @Column({ nullable: true })
  @ApiProperty()
  remark: string;

  @Column({ type: 'tinyint', nullable: true, default: 1 })
  @ApiProperty()
  status: number;

  @Column({ name: 'role_id', nullable: true })
  @ApiProperty()
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  @ApiProperty()
  role: Role;
}
