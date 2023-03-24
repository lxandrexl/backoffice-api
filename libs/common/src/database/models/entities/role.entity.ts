import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Roles')
export class RoleEntity {
  @PrimaryGeneratedColumn()
  roleId: number;
}
