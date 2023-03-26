import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export interface Settings {
  title: string;
  description: string;
  tag: string;
}

export class OpenAPI {
  static BuildDocumentation(app: INestApplication, settings: Settings) {
    const config = new DocumentBuilder()
      .setTitle(settings.title)
      .setDescription(settings.description)
      .setVersion('1.0')
      .addTag(settings.tag)
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }
}
