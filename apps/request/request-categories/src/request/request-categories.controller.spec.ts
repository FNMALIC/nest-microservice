import { Test, TestingModule } from '@nestjs/testing';
import { Request/requestCategoriesController } from './request/request-categories.controller';
import { Request/requestCategoriesService } from './request/request-categories.service';

describe('Request/requestCategoriesController', () => {
  let request/requestCategoriesController: Request/requestCategoriesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [Request/requestCategoriesController],
      providers: [Request/requestCategoriesService],
    }).compile();

    request/requestCategoriesController = app.get<Request/requestCategoriesController>(Request/requestCategoriesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(request/requestCategoriesController.getHello()).toBe('Hello World!');
    });
  });
});
