import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

import { BlockchainModule } from './../src/blockchain.module';

describe('AppController (e2e)', () => {
  let blockchainApplication: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BlockchainModule],
    }).compile();

    blockchainApplication = moduleFixture.createNestApplication();
    await blockchainApplication.init();
  });

  it('/start (GET)', async () => {
    await request(blockchainApplication.getHttpServer())
      .get('/start')
      .expect(200)
      .expect({ message: 'Blockchain successfully created.' });
  });

  it('/chain (GET)', async () => {
    await request(blockchainApplication.getHttpServer())
      .get('/chain')
      .expect(405)
      .expect({
        message: 'Blockchain has not been initialized.',
      });
  });

  it('/mine (POST)', async () => {
    await request(blockchainApplication.getHttpServer())
      .post('/mine')
      .send({ data: 'test' })
      .expect(405)
      .expect({
        message: 'Blockchain has not been initialized.',
      });
  });

  it('/start (GET), /chain (GET), /mine (POST) and /chain (GET)', async () => {
    await request(blockchainApplication.getHttpServer())
      .get('/start')
      .expect(200)
      .expect({ message: 'Blockchain successfully created.' });

    await request(blockchainApplication.getHttpServer())
      .get('/chain')
      .expect(200)
      .expect(({ body }) => expect(body).toHaveLength(1));

    await request(blockchainApplication.getHttpServer())
      .post('/mine')
      .send({ data: 'test' })
      .expect(201)
      .expect(({ body }) => expect(body.data).toEqual('test'));

    await request(blockchainApplication.getHttpServer())
      .get('/chain')
      .expect(200)
      .expect(({ body }) => expect(body).toHaveLength(2));
  });
});
