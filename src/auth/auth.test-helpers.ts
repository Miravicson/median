import type { AuthEntity } from './entity/auth.entity';
import type { LoginDto } from './dto/login.dto';
import { faker } from '@faker-js/faker';

export const anAuthEntity = (authEntity: Partial<AuthEntity> = {}) => {
  return {
    accessToken: faker.string.nanoid(28),
    ...authEntity,
  } as AuthEntity;
};

export const aLoginDto = (data: Partial<LoginDto> = {}) => {
  return {
    email: faker.internet.email(),
    password: faker.internet.password(),
    ...data,
  } as LoginDto;
};
