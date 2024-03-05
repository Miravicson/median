import { Test, TestingModule } from '@nestjs/testing';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { createMock, type DeepMocked } from '@golevelup/ts-jest';
import { anAuthEntity, aLoginDto } from './auth.test-helpers';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: DeepMocked<AuthService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [],
      imports: [JwtModule],
    })
      .useMocker(createMock)
      .compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('AuthController.login', () => {
    it('should login', async () => {
      const authEntity = anAuthEntity();
      const loginDto = aLoginDto();
      authService.login.mockResolvedValueOnce(authEntity);
      const authServiceLoginSpy = jest.spyOn(authService, 'login');

      const loginResult = controller.login(loginDto);

      expect(authServiceLoginSpy).toHaveBeenCalledTimes(1);
      expect(authServiceLoginSpy).toHaveBeenCalledWith(
        loginDto.email,
        loginDto.password,
      );
      await expect(loginResult).resolves.toBe(authEntity);
    });
  });
});
