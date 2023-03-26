import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqOptions } from '@nestjs/microservices';
import { AUTH_SERVICE, RmqService } from '@app/common';
import { OpenAPI } from './auth.openapi';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  OpenAPI.BuildDocumentation(app);
  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(AUTH_SERVICE, true),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
