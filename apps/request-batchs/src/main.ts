import { NestFactory } from '@nestjs/core';
import { RequestBatchsModule } from './request-batchs.module';
import { Transport } from '@nestjs/microservices';
import { RequestsModule } from 'apps/requests/src/requests.module';
import { clientProxy } from 'helpers/func';


async function bootstrap() {
  const app = await NestFactory.createMicroservice(RequestsModule,{
     transport: Transport.TCP,
          options: {
            host: 'localhost',
            port: clientProxy()[__dirname.split("\\").pop()],
          },
  });
  await app.listen();
}
bootstrap();
