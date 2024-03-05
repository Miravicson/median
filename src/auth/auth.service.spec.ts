import { Test, TestingModule } from '@nestjs/testing';
import { type DeepMockProxy } from 'jest-mock-extended';

import { AuthService } from './auth.service';
import { PrismaService } from '../prisma/prisma.service';
import { aLoginDto, anAuthEntity } from './auth.test-helpers';
import { customCreateMock } from 'test/utils';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { hashPassWord } from '../utils/index';
import { aUser } from 'src/users/user.test-helpers';
import type { DeepMocked } from '@golevelup/ts-jest';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: DeepMockProxy<PrismaService>;
  let jwtService: DeepMocked<JwtService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
    })
      .useMocker(customCreateMock)
      .compile();

    service = module.get<AuthService>(AuthService);
    prisma = module.get(PrismaService);
    jwtService = module.get(JwtService);
    prisma.user.findUnique.mockClear();
    jwtService.sign.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('AuthService.login', () => {
    it('throws a NotFoundException when user account does not exist', async () => {
      const { email, password } = aLoginDto();
      prisma.user.findUnique.mockResolvedValueOnce(null);
      const loginResult = service.login(email, password);
      await expect(loginResult).rejects.toBeInstanceOf(NotFoundException);
    });

    it('throws a UnauthorizedException when a user enters invalid password', async () => {
      const { email, password } = aLoginDto();
      const user = aUser({ email, password: await hashPassWord(password) });
      prisma.user.findUnique.mockResolvedValueOnce(user);
      const loginResult = service.login(email, 'wrong-password');

      await expect(loginResult).rejects.toBeInstanceOf(UnauthorizedException);
    });

    it('returns a valid AuthEntity when user credentials are correct', async () => {
      const { email, password } = aLoginDto();
      const user = aUser({ email, password: await hashPassWord(password) });
      const authEntity = anAuthEntity();
      jwtService.sign.mockReturnValue(authEntity.accessToken);
      prisma.user.findUnique.mockResolvedValueOnce(user);

      const loginResult = service.login(email, password);
      await expect(loginResult).resolves.toEqual(authEntity);
    });
  });
});
