import { Controller, Get } from '@nestjs/common';
import { Request/requestStepConfigsService } from './request/request-step-configs.service';

@Controller()
export class Request/requestStepConfigsController {
  constructor(private readonly request/requestStepConfigsService: Request/requestStepConfigsService) {}

  @Get()
  getHello(): string {
    return this.request/requestStepConfigsService.getHello();
  }
}
