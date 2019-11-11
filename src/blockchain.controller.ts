import {
  Controller,
  Get,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { Block } from 'blockchain-demo';
import Mine from './mine';

@Controller()
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('start')
  start(): any {
    try {
      this.blockchainService.start();
      return { message: 'Blockchain successfully created.' };
    } catch (error) {
      throw new HttpException(
        {
          message: 'Blockchain has not been initialized.',
        },
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  @Get('chain')
  getChain(): Block[] | any {
    try {
      return this.blockchainService.getChain();
    } catch (error) {
      throw new HttpException(
        {
          message: 'Blockchain has not been initialized.',
        },
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }

  @Post('mine')
  mine(@Body() mine: Mine): Block | any {
    try {
      return this.blockchainService.mine(mine.data);
    } catch (error) {
      throw new HttpException(
        {
          message: 'Blockchain has not been initialized.',
        },
        HttpStatus.METHOD_NOT_ALLOWED,
      );
    }
  }
}
