import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';
import { AUTH_SERVICE, RmqService } from '@app/common';
import { OpenAPI, Settings } from '@app/common/utils/openapi.doc';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  const settings: Settings = {
    title: 'Servicio de Autenticación',
    description: 'Servicio para autenticar el api',
    tag: 'Auth',
  };

  OpenAPI.BuildDocumentation(app, settings);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
