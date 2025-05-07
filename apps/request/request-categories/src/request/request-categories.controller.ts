import { Controller, Get } from '@nestjs/common';
import { Request/requestCategoriesService } from './request/request-categories.service';

@Controller()
export class Request/requestCategoriesController {
  constructor(private readonly request/requestCategoriesService: Request/requestCategoriesService) {}

  @Get()
  getHello(): string {
    return this.request/requestCategoriesService.getHello();
  }
}
