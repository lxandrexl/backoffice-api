import { AuthModule, CLIENTS_SERVICE, RmqModule } from '@app/common';
import { DatabaseModule } from '@app/common/database/database.module';
import { CLIENTS_TABLE } from '@app/common/database/permissions/tables';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.string().required(),
      }),
      envFilePath: './apps/clients/.env',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature(CLIENTS_TABLE),
    AuthModule,
  ],
  controllers: [ClientsController],
  providers: [ClientsService],
})
export class ClientsModule {}
