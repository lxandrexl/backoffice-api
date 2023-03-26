import { AuthModule, EMPLOYEES_SERVICE, RmqModule } from '@app/common';
import { DatabaseModule } from '@app/common/database/database.module';
import { EMPLOYEE_TABLES } from '@app/common/database/permissions/tables';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { EmployeesController } from './employees.controller';
import { EmployeesService } from './employees.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/employees/.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature(EMPLOYEE_TABLES),
    AuthModule,
  ],
  controllers: [EmployeesController],
  providers: [EmployeesService],
})
export class EmployeesModule {}
