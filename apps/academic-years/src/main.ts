import {NestFactory} from '@nestjs/core';
import {AcademicYearsModule} from './academic-years.module';
import {Transport} from "@nestjs/microservices";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AcademicYearsModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: 3003,
    },
  });
  await app.listen();
}

bootstrap();
