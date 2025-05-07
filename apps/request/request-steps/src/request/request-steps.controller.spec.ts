import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestStepsController } from './request/request-steps.controller';
import { Request/requestStepsService } from './request/request-steps.service';

describe('Request/requestStepsController', () => {
  let request/requestStepsController: Request/requestStepsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestStepsController],
      providers: [Request/requestStepsService],
    }).compile();

    request/requestStepsController = app.get<Request/requestStepsController>(Request/requestStepsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestStepsController.getHello()).toBe('Hello World!');
    });
  });
});
