import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserAccount } from './user/user.model';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AuthModule, UserModule],
      controllers: [AppController],
    })
      .overrideProvider(getRepositoryToken(UserAccount))
      .useValue({})
      .compile();

    appController = app.get<AppController>(AppController);
  });

  describe('login', () => {
    it('returns token', async () => {
      // Note that since we call the 'login' function here directly, it doesn't go through the user authentication
      // properly. That's why at least for now it'll always return the access token.
      const login = await appController.login({
        user: {
          username: 'testUsername',
          password: 'testPassword',
        },
      });

      expect(login.access_token).toBeTruthy();
    });
  });
});
