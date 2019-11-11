import { Controller, Get, HttpCode, Post, Body } from '@nestjs/common';
import { BlockchainService } from './blockchain.service';
import { Block } from 'blockchain-demo';

@Controller()
export class BlockchainController {
  constructor(private readonly blockchainService: BlockchainService) {}

  @Get('start')
  start(): any {
    this.blockchainService.start();
    return { message: 'Blockchain successfully created.' };
  }

  @Get('chain')
  getChain(): Block[] | any {
    try {
      return this.blockchainService.getChain();
    } catch (error) {
      return { message: 'Blockchain has not been initialized.' };
    }
  }

  @Post('mine')
  mine(@Body() data: any): Block | any {
    try {
      return this.blockchainService.mine(data);
    } catch (error) {
      return { message: 'Blockchain has not been initialized.' };
    }
  }
}
