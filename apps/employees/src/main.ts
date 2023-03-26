import { EMPLOYEES_SERVICE, RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { EmployeesModule } from './employees.module';
import { Settings, OpenAPI } from '@app/common/utils/openapi.doc';

async function bootstrap() {
  const app = await NestFactory.create(EmployeesModule);
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  const settings: Settings = {
    title: 'Servicio de Empleados',
    description: 'Servicio para administrar empleados',
    tag: 'Employees',
  };

  OpenAPI.BuildDocumentation(app, settings);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(EMPLOYEES_SERVICE, true),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
