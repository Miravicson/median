import type { Article } from '@prisma/client';
import { aUser } from '../users/user.test-helpers';
import { faker } from '@faker-js/faker';

export const anArticle = (article: Partial<Article> = {}) => {
  return {
    body: faker.lorem.paragraph(),
    description: faker.lorem.sentence(),
    createdAt: faker.date.anytime(),
    updatedAt: faker.date.anytime(),
    id: faker.number.bigInt(),
    published: false,
    title: faker.lorem.words({ min: 2, max: 5 }),
    author: aUser(),
    ...article,
  } as Article;
};
