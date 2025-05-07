import { NestFactory } from '@nestjs/core';
import { LessonsModule } from './lessons.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LessonsModule,{
    transport: Transport.TCP,
    options: {
      port: 3004,
    }
  });
  await app.listen();
}
bootstrap();
