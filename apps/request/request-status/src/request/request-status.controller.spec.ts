import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestStatusController } from './request/request-status.controller';
import { Request/requestStatusService } from './request/request-status.service';

describe('Request/requestStatusController', () => {
  let request/requestStatusController: Request/requestStatusController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestStatusController],
      providers: [Request/requestStatusService],
    }).compile();

    request/requestStatusController = app.get<Request/requestStatusController>(Request/requestStatusController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestStatusController.getHello()).toBe('Hello World!');
    });
  });
});
