import {NestFactory} from '@nestjs/core';
import {LessonsModule} from './lessons.module';
import {Transport} from "@nestjs/microservices";
import {clientProxy} from "../../../helpers/func";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(LessonsModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: clientProxy()[__dirname.split("\\").pop()],
    },
  })
  await app.listen();
}

bootstrap();
