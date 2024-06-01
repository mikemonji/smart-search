import { Test, TestingModule } from '@nestjs/testing';
import { DishTypesService } from './dish-types.service';

describe('DishTypesService', () => {
  let service: DishTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DishTypesService],
    }).compile();

    service = module.get<DishTypesService>(DishTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
