import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Modules')
export class ModuleEntity {
  @PrimaryGeneratedColumn()
  moduleId: number;

  @Column({ default: '' })
  moduleValue: string;

  @Column({ default: '' })
  modulePath: string;
}
