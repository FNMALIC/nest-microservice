import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestGroupsController } from './request/request-groups.controller';
import { Request/requestGroupsService } from './request/request-groups.service';

describe('Request/requestGroupsController', () => {
  let request/requestGroupsController: Request/requestGroupsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestGroupsController],
      providers: [Request/requestGroupsService],
    }).compile();

    request/requestGroupsController = app.get<Request/requestGroupsController>(Request/requestGroupsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestGroupsController.getHello()).toBe('Hello World!');
    });
  });
});
