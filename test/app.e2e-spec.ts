import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { getConnectionToken } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import * as request from 'supertest';

import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let connection: Connection;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    connection = await moduleFixture.get<Connection>(getConnectionToken());

    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  afterAll(() => {
    connection.close();
  });

  describe('/auth/login (POST)', () => {
    describe('when user data is not given properly', () => {
      it.each([
        undefined,
        {},
        { username: 'nonExistingTestUser' },
        { password: 'testPassword' },
        { randomTestField: 'testValue' },
      ])('returns 401 unauthorized', async (userData) => {
        await request(app.getHttpServer())
          .post('/auth/login')
          .send(userData)
          .expect(401);
      });
    });

    describe('when user data is given properly', () => {
      describe('when user is not found', () => {
        it('returns 401 unauthorized', async () => {
          await request(app.getHttpServer())
            .post('/auth/login')
            .send({ username: 'nonExistingTestUser', password: 'testPassword' })
            .expect(401);
        });
      });
      // TODO: once we can run the tests in an isolated database, we should test that
      // the login API works properly when the login succeeds
    });
  });
});
