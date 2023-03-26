import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ModuleEntity } from './module.entity';
import { PersonEntity } from './person.entity';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn('increment')
  roleId: number;

  @OneToOne(() => ModuleEntity, { nullable: false })
  @JoinColumn({ name: 'moduleId' })
  _module: ModuleEntity;
}
