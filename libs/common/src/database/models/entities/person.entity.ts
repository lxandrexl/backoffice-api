import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Persons')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  personId: number;

  @Column({ default: '' })
  names: string;

  @Column({ default: '' })
  lastNames: string;

  @Column({ default: '' })
  gender: string;

  @Column({ default: '' })
  documentTypeCode: string;

  @Column({ default: '' })
  documentNumber: string;

  @Column({ default: '' })
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
