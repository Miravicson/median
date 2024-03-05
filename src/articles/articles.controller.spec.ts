import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';

import { ArticleEntity } from './entities/article.entity';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import type { CreateArticleDto } from './dto/create-article.dto';
import { anArticle } from './article.test-helper';

describe('ArticlesController', () => {
  let controller: ArticlesController;
  let articleService: DeepMocked<ArticlesService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
      providers: [],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<ArticlesController>(ArticlesController);
    articleService = module.get(ArticlesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ArticlesController.create', () => {
    it('creates an article', async () => {
      const article = anArticle();
      articleService.create.mockResolvedValueOnce(article);
      const articleEntity = ArticleEntity.one(article);
      const createArticle = controller.create({} as CreateArticleDto);
      await expect(createArticle).resolves.toEqual(articleEntity);
    });
  });

  describe('ArticlesController.findDrafts', () => {
    it('Retrieves draft articles', async () => {
      const draftArticles = [
        anArticle({ title: 'First Article', published: false }),
        anArticle({ title: 'Second article', published: false }),
      ];
      articleService.findDrafts.mockResolvedValueOnce(draftArticles);

      const findDrafts = await controller.findDrafts();
      expect(findDrafts).toEqual(ArticleEntity.many(draftArticles));
    });
  });

  describe('ArticlesController.findAll', () => {
    it('Retrieves draft articles', async () => {
      const draftArticles = [
        anArticle({ title: 'First Article', published: true }),
        anArticle({ title: 'Second article' }),
      ];
      articleService.findAll.mockResolvedValueOnce(draftArticles);

      const findAll = await controller.findAll();
      expect(findAll).toEqual(ArticleEntity.many(draftArticles));
    });
  });
});
