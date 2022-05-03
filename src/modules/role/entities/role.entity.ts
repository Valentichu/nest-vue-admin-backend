import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity({ name: 't_role' })
export class Role extends BaseEntity {
  @Column()
  name: string;
}
