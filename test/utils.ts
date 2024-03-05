import { type PrismaClient } from '@prisma/client';
import { createMock } from '@golevelup/ts-jest';
import { mockDeep } from 'jest-mock-extended';
import type { InjectionToken } from '@nestjs/common';
import { PrismaService } from '../src/prisma/prisma.service';

export const customCreateMock = (token?: InjectionToken) => {
  return token === PrismaService ? mockDeep<PrismaClient>() : createMock(token);
};
