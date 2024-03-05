import type { User } from '@prisma/client';
import { faker } from '@faker-js/faker';

export const aUser = (user: Partial<User> = {}) => {
  return {
    id: faker.number.bigInt(),
    createdAt: faker.date.anytime(),
    email: faker.internet.email(),
    name: `${faker.person.firstName()} ${faker.person.lastName()}`,
    password: `${faker.string.alphanumeric(5)}`,
    updatedAt: faker.date.anytime(),
    ...user,
  } as User;
};
