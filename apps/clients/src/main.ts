import { CLIENTS_SERVICE, RmqService } from '@app/common';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { RmqOptions } from '@nestjs/microservices';
import { ClientsModule } from './clients.module';

async function bootstrap() {
  const app = await NestFactory.create(ClientsModule);
  const rmqService = app.get<RmqService>(RmqService);
  const configService = app.get(ConfigService);

  app.connectMicroservice<RmqOptions>(
    rmqService.getOptions(CLIENTS_SERVICE, true),
  );
  app.useGlobalPipes(new ValidationPipe());

  await app.startAllMicroservices();
  await app.listen(configService.get('PORT'));
}
bootstrap();
