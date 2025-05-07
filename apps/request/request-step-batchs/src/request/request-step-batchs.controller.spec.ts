import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestStepBatchsController } from './request/request-step-batchs.controller';
import { Request/requestStepBatchsService } from './request/request-step-batchs.service';

describe('Request/requestStepBatchsController', () => {
  let request/requestStepBatchsController: Request/requestStepBatchsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestStepBatchsController],
      providers: [Request/requestStepBatchsService],
    }).compile();

    request/requestStepBatchsController = app.get<Request/requestStepBatchsController>(Request/requestStepBatchsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestStepBatchsController.getHello()).toBe('Hello World!');
    });
  });
});
