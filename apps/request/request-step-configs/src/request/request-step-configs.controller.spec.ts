import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestStepConfigsController } from './request/request-step-configs.controller';
import { Request/requestStepConfigsService } from './request/request-step-configs.service';

describe('Request/requestStepConfigsController', () => {
  let request/requestStepConfigsController: Request/requestStepConfigsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestStepConfigsController],
      providers: [Request/requestStepConfigsService],
    }).compile();

    request/requestStepConfigsController = app.get<Request/requestStepConfigsController>(Request/requestStepConfigsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestStepConfigsController.getHello()).toBe('Hello World!');
    });
  });
});
