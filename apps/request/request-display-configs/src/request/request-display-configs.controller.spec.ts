import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestDisplayConfigsController } from './request/request-display-configs.controller';
import { Request/requestDisplayConfigsService } from './request/request-display-configs.service';

describe('Request/requestDisplayConfigsController', () => {
  let request/requestDisplayConfigsController: Request/requestDisplayConfigsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestDisplayConfigsController],
      providers: [Request/requestDisplayConfigsService],
    }).compile();

    request/requestDisplayConfigsController = app.get<Request/requestDisplayConfigsController>(Request/requestDisplayConfigsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestDisplayConfigsController.getHello()).toBe('Hello World!');
    });
  });
});
