import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { HttpAdapterHost, NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './prisma-client-exception/prisma-client-exception.filter';
import {
  CorsConfig,
  NestConfig,
  SwaggerConfig,
} from './common/configs/config.interface';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest') as NestConfig;
  const corsConfig = configService.get<CorsConfig>('cors') as CorsConfig;
  const swaggerConfig = configService.get<SwaggerConfig>(
    'swagger',
  ) as SwaggerConfig;

  if (swaggerConfig.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, document);
  }

  // Cors
  if (corsConfig.enabled) {
    app.enableCors();
  }
  await app.listen(nestConfig.port);
  logger.log(`Application started on PORT ${nestConfig.port} ✅`);
}
bootstrap();
