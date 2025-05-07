import { Module } from '@nestjs/common';
import { Request/requestCategoriesController } from './request/request-categories.controller';
import { Request/requestCategoriesService } from './request/request-categories.service';

@Module({
  imports: [],
  controllers: [Request/requestCategoriesController],
  providers: [Request/requestCategoriesService],
})
export class Request/requestCategoriesModule {}
