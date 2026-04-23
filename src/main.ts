import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Agregemos el ValidationPipe global para validar las solicitudes entrantes
  app.useGlobalPipes(new ValidationPipe());
  // Configuramos el prefijo global para las rutas de la API
  app.setGlobalPrefix('api/v1');
  // Habilitamos CORS para permitir solicitudes desde cualquier origen
  app.enableCors();
  // Configuramos Swagger para la documentación de la API
  const config = new DocumentBuilder()
    .setTitle('Leads API OMC Test')
    .setDescription(
      'API para la gestión de leads con autenticación JWT y resumen AI',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
