import { JwtAuthGuard } from '@app/common';
import { ResponseInterceptor } from '@app/common/utils/interceptors/response.interceptor';
import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateEmployeeRequest } from '@app/common/database/models/dto/create-employee.request';
import { EmployeesService } from './employees.service';

@UseInterceptors(ResponseInterceptor)
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  createEmployee(
    @Body() payload: CreateEmployeeRequest,
    @Req() _req: any,
  ): any {
    return this.employeesService.createEmployee(payload, _req);
  }
}
