import { NestFactory } from '@nestjs/core';
import { Request/requestGroupsModule } from './request/request-groups.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestGroupsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
