import {NestFactory} from '@nestjs/core';
import * as process from 'process';
import {AppModule} from './app.module';
import * as bodyParser from 'body-parser';
import {LoggerService} from "../../../helpers/logger.service";
import {LoggerInterceptor} from "../../../helpers/logger.interceptor";
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));

  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  SwaggerModule.setup('api', app, () =>
    SwaggerModule.createDocument(app, new DocumentBuilder()
      .setTitle('GALIO - API Doc')
      .setDescription('API Description')
      .setVersion('1.0.0')
      .addApiKey({
        type: 'apiKey',
        name: 'apiGKey',
        in: 'header',
      })
      .build(), {
      operationIdFactory: (controllerKey: string, methodKey: string) =>
        methodKey,
    }));
  await app.listen(3000);
}

bootstrap();
