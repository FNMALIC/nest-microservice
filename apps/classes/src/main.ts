import {NestFactory} from '@nestjs/core';
import {ClassesModule} from './classes.module';
import {Transport} from "@nestjs/microservices";
import {clientProxy} from "../../../helpers/func";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ClassesModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: clientProxy()[__dirname.split("\\").pop()],
    },
  });
  await app.listen();
}

bootstrap();
 