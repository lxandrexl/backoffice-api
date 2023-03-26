import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class OpenAPI {
  static BuildDocumentation(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Servicio de Empleados')
      .setDescription('Servicio para administrar empleados')
      .setVersion('1.0')
      .addTag('Employees')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
