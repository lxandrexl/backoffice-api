import {
  EmployeeEntity,
  PersonEntity,
  RoleEntity,
} from '@app/common/database/models';
import { EmployeeDAO } from '@app/common/database/models/dao/employe.dao';
import { PersonDAO } from '@app/common/database/models/dao/person.dao';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateEmployeeRequest } from '../../../libs/common/src/database/models/dto/create-employee.request';
import { RoleDAO } from '@app/common/database/models/dao/role.dao';

const saltOrRounds = 10;

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(PersonEntity)
    private readonly personRepository: Repository<PersonEntity>,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async createEmployee(payload: CreateEmployeeRequest, { user }: any) {
    try {
      const roleDAO: RoleEntity = RoleDAO.parse(payload);

      const hash = await bcrypt.hash(payload.password, saltOrRounds);
      payload.password = hash;

      const personDAO: PersonEntity = PersonDAO.parse(payload, user);
      const person = await this.personRepository.save(personDAO);

      const employeeDAO: EmployeeEntity = EmployeeDAO.parse(
        payload,
        person,
        roleDAO,
      );
      const employee = await this.employeeRepository.save(employeeDAO);

      return employee;
    } catch (err) {
      throw new HttpException(
        'Method Not Allowed',
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }
}
