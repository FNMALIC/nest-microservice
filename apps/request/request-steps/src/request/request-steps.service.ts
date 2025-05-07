import { Injectable } from '@nestjs/common';

@Injectable()
export class Request/requestStepsService {
  getHello(): string {
    return 'Hello World!';
  }
}
