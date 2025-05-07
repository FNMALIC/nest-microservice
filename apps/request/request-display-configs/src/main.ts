import { NestFactory } from '@nestjs/core';
import { Request/requestDisplayConfigsModule } from './request/request-display-configs.module';

async function bootstrap() {
  const app = await NestFactory.create(Request/requestDisplayConfigsModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
