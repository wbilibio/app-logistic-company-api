import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { AppModule } from './app.module';
import { RedisCacheRepository } from './database/RedisCacheRepository';
import { BusinessExceptionFilter } from './middlewares/error-handler.middleware';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    }),
  );

  app.useGlobalFilters(new BusinessExceptionFilter());

  if (process.env.SENTRY_ENV !== 'production') {
    app.enableCors({ allowedHeaders: '*', exposedHeaders: '*' });

    const version = process.env.npm_package_version as string;
    const config = new DocumentBuilder()
      .setTitle('Application Logistic Company Swagger')
      .setDescription('The applications API description')
      .setVersion(version)
      .addTag('Applications Logistic Company')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0').then(() => {
    console.log(`app-logistic-company-api ${port}`);
    RedisCacheRepository.connect({
      host: process.env.REDIS_HOST as string,
      port: process.env.REDIS_PORT as string,
      password: process.env.REDIS_PASS ?? undefined,
      maxRetries: '2',
    });
  });
}

bootstrap().catch((err) => {
  console.error(err);
  process.exit(1);
});
