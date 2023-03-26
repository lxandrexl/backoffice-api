import { CreateEmployeeRequest } from '../dto/create-employee.request';
import { EmployeeEntity } from '../entities/employee.entity';
import { PersonEntity } from '../entities/person.entity';
import { RoleEntity } from '../entities/role.entity';

export class EmployeeDAO {
  static parse(
    employeeDTO: CreateEmployeeRequest,
    _person: PersonEntity,
    _role: RoleEntity,
  ): EmployeeEntity {
    const employee = new EmployeeEntity();
    employee.employeeUniqId = employeeDTO.employeeUniqId;
    employee.phoneNumber = employeeDTO.phoneNumber;
    employee.statusCode = employeeDTO.statusCode;
    employee.password = employeeDTO.password;
    employee._person = _person;
    employee._role = _role;

    return employee;
  }
}
