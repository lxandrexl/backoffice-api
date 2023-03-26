import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('Persons')
export class PersonEntity {
  @PrimaryGeneratedColumn('increment')
  personId: number;

  @Column({ default: '' })
  names: string;

  @Column({ default: '' })
  lastNames: string;

  @Column({ default: '' })
  gender: string;

  @Column({ default: '' })
  documentTypeCode: string;

  @Column({ default: '', unique: true })
  documentNumber: string;

  @Column({ default: '', unique: true })
  email: string;

  @Column({ default: '' })
  birthDay: string;

  @Column({ default: '' })
  departmentCode: string;

  @Column({ default: '' })
  provinceCode: string;

  @Column({ default: '' })
  zipCode: string;

  @Column({ default: '' })
  creationDate: string;

  @Column({ default: '' })
  creationUser: string;

  @Column({ default: '' })
  modificationDate: string;

  @Column({ default: '' })
  modificationUser: string;
}
