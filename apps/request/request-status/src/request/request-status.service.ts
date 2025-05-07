import { Injectable } from '@nestjs/common';

@Injectable()
export class Request/requestStatusService {
  getHello(): string {
    return 'Hello World!';
  }
}
