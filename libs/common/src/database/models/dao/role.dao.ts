import { CreateEmployeeRequest } from '../dto/create-employee.request';
import { RoleEntity } from '../entities/role.entity';

export class RoleDAO {
  static parse(employeeDTO: CreateEmployeeRequest): RoleEntity {
    const role = new RoleEntity();
    role.roleId = employeeDTO.roleId;

    return role;
  }
}
