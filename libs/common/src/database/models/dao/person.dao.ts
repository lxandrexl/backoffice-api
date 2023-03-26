import { CreateEmployeeRequest } from '../dto/create-employee.request';
import { PersonEntity } from '../entities/person.entity';

export class PersonDAO {
  static parse(employeeDTO: CreateEmployeeRequest, user: any): PersonEntity {
    const person = new PersonEntity();
    person.names = employeeDTO.names;
    person.lastNames = employeeDTO.lastNames;
    person.gender = employeeDTO.gender;
    person.documentTypeCode = employeeDTO.documentTypeCode;
    person.documentNumber = employeeDTO.documentNumber;
    person.email = employeeDTO.email;
    person.birthDay = employeeDTO.birthDay;
    person.departmentCode = employeeDTO.departmentCode;
    person.provinceCode = employeeDTO.provinceCode;
    person.zipCode = employeeDTO.zipCode;
    person.creationDate = employeeDTO.creationDate;
    person.creationUser = user.email;

    return person;
  }
}
