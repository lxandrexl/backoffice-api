import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleEntity } from './module.entity';
import { PersonEntity } from './person.entity';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleId: number;

  @OneToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'personId' })
  _person: PersonEntity;

  @OneToOne(() => ModuleEntity, { nullable: false })
  @JoinColumn({ name: 'moduleId' })
  _module: RoleEntity;
}
