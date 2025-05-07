import { Injectable } from '@nestjs/common';

@Injectable()
export class Request/requestBatchService {
  getHello(): string {
    return 'Hello World!';
  }
}
