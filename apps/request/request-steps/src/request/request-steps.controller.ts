import { Controller, Get } from '@nestjs/common';
import { Request/requestStepsService } from './request/request-steps.service';

@Controller()
export class Request/requestStepsController {
  constructor(private readonly request/requestStepsService: Request/requestStepsService) {}

  @Get()
  getHello(): string {
    return this.request/requestStepsService.getHello();
  }
}
