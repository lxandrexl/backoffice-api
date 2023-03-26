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
    const dao = new EmployeeDAO();
    const employee = new EmployeeEntity();
    employee.employeeUniqId = dao.buildUniqId(employeeDTO, _person);
    employee.phoneNumber = employeeDTO.phoneNumber;
    employee.statusCode = employeeDTO.statusCode;
    employee.password = employeeDTO.password;
    employee._person = _person;
    employee._role = _role;

    return employee;
  }

  buildUniqId(employee: CreateEmployeeRequest, person: PersonEntity): string {
    const est1 =
      employee.names.substring(0, 1) + employee.lastNames.substring(0, 1);
    const est2 = employee.documentNumber.substring(
      employee.documentNumber.length - 3,
      employee.documentNumber.length,
    );
    const est3 = employee.birthDay
      .substring(0, 10)
      .replace(new RegExp('-', 'g'), '');
    const employeeId = `EMP${est1}${est2}${person.personId}${est3}`;

    return employeeId;
  }
}
