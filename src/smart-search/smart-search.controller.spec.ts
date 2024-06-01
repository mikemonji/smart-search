import { Test, TestingModule } from '@nestjs/testing';
import { SmartSearchController } from './smart-search.controller';

describe('SmartSearchController', () => {
  let controller: SmartSearchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartSearchController],
    }).compile();

    controller = module.get<SmartSearchController>(SmartSearchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
