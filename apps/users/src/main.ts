import {NestFactory} from '@nestjs/core';
import {UsersModule} from './users.module';
import {Transport} from "@nestjs/microservices";
import {clientProxy} from "../../../helpers/func";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: clientProxy()[__dirname.split("\\").pop()],
      },
    }
  );
  await app.listen();
}

bootstrap();
