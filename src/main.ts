import { NestFactory } from '@nestjs/core';
import { BlockchainModule } from './blockchain.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const blockchainApplication = await NestFactory.create(BlockchainModule);
  blockchainApplication.useGlobalPipes(new ValidationPipe());
  await blockchainApplication.listen(3000);
}
bootstrap();
