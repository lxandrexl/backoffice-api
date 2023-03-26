import { EmployeeEntity } from '@app/common/database/models/entities/employee.entity';
import { PersonEntity } from '@app/common/database/models/entities/person.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Response } from 'express';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @InjectRepository(EmployeeEntity)
    private readonly employeeRepository: Repository<EmployeeEntity>,
  ) {}

  async validateUser(_email: string, _password: string) {
    const employee: EmployeeEntity = await this.employeeRepository
      .createQueryBuilder('Employees')
      .innerJoinAndSelect('Employees._person', 'Persons')
      .where('Persons.email = :email', { email: _email })
      .getOne();

    // return { email: _email, password: _password };

    if (!employee)
      throw new UnauthorizedException('Credentials are not valid.');

    const passwordIsValid = await bcrypt.compare(_password, employee.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Credentials are not valid.');

    const { password, ...response } = employee;

    return { ...response };
  }

  login(user: any, response: Response) {
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(user);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  logout(response: Response) {
    response.cookie('Authentication', '', {
      httpOnly: true,
      expires: new Date(),
    });
  }
}
