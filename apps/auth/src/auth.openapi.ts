import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export class OpenAPI {
  static BuildDocumentation(app: INestApplication) {
    const config = new DocumentBuilder()
      .setTitle('Servicio de Autenticación')
      .setDescription('Servicio para autenticar el api')
      .setVersion('1.0')
      .addTag('Auth')
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
