import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Role } from 'src/modules/role/entities/role.entity';

@Entity()
export class Page extends BaseEntity {
  @Column()
  name: string;
}
