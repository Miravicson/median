import { Test, TestingModule } from '@nestjs/testing';

import { ArticlesService } from './articles.service';
import { createMock } from '@golevelup/ts-jest';

describe('ArticlesService', () => {
  let service: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService],
    })
      .useMocker(createMock)
      .compile();

    service = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
