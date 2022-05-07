import { Column, Entity } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';

@Entity()
export class RolePage extends BaseEntity {
  @Column()
  role_id: number;

  @Column()
  page_id: number;

  @Column()
  create: boolean;

  @Column()
  retrieve: boolean;

  @Column()
  update: boolean;

  @Column()
  delete: boolean;
}
