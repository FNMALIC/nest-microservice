import { Controller, Get } from '@nestjs/common';
import { Request/requestGroupsService } from './request/request-groups.service';

@Controller()
export class Request/requestGroupsController {
  constructor(private readonly request/requestGroupsService: Request/requestGroupsService) {}

  @Get()
  getHello(): string {
    return this.request/requestGroupsService.getHello();
  }
}
