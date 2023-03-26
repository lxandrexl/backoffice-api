import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { PersonEntity } from './person.entity';
import { RoleEntity } from './role.entity';

@Entity('Employees')
export class EmployeeEntity {
  @PrimaryGeneratedColumn('increment')
  employeeId: number;

  @Column({ default: '' })
  employeeUniqId: string;

  @Column({ default: '' })
  phoneNumber: string;

  @Column({ default: '' })
  statusCode: string;

  @Column({ default: '' })
  password: string;

  @OneToOne(() => PersonEntity, { nullable: false })
  @JoinColumn({ name: 'personId' })
  _person: PersonEntity;

  @ManyToOne(() => RoleEntity, { nullable: false })
  @JoinColumn({ name: 'roleId' })
  _role: RoleEntity;
  // private _role: never;
}
