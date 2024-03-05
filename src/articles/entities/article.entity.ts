import { ApiProperty } from '@nestjs/swagger';
import { Article } from '@prisma/client';
import { UserEntity } from '../../users/entities/user.entity';

export class ArticleEntity implements Article {
  constructor(data: Partial<ArticleEntity> | null) {
    if (data !== null) {
      const { author, ...articleEntity } = data;
      Object.assign(this, articleEntity);

      if (author) {
        this.author = new UserEntity(author);
      }
    }
  }

  static many(articles: ArticleEntity[]) {
    return articles.map((article) => new ArticleEntity(article));
  }

  static one(article: ArticleEntity | null) {
    return new ArticleEntity(article);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false, nullable: true })
  description: string | null;

  @ApiProperty()
  body: string;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  authorId: number | null;

  @ApiProperty({ required: false, type: UserEntity, nullable: true })
  author?: UserEntity | null;
}
