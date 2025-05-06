// import { NestFactory } from '@nestjs/core';
// import { UserServiceModule } from './user-service.module';

// async function bootstrap() {
//   const app = await NestFactory.create(UserServiceModule);
//   await app.listen(process.env.port ?? 3000);
// }
// bootstrap();

// user-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { UserModule } from './user-service.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UserModule,
    {
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    },
  );
  await app.listen();
  console.log('User microservice is listening');
}
bootstrap();