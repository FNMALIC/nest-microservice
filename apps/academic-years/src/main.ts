import {NestFactory} from '@nestjs/core';
import {AcademicYearsModule} from './academic-years.module';
import {Transport} from "@nestjs/microservices";
import {clientProxy} from "../../../helpers/func";
import * as fs from "fs";

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AcademicYearsModule, {
    transport: Transport.TCP,
    options: {
      host: 'localhost',
      port: clientProxy()[__dirname.split("\\").pop()],
    },
  });
  await app.listen();
}

bootstrap();
