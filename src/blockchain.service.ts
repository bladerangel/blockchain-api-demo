import { Injectable } from '@nestjs/common';
import { Blockchain, Block } from 'blockchain-demo';

@Injectable()
export class BlockchainService {
  private blockchain: Blockchain;

  start(): void {
    this.blockchain = new Blockchain();
  }

  getChain(): Block[] {
    return this.blockchain.chain;
  }

  mine(data: any): Block {
    this.blockchain.mine(data);
    return this.blockchain.lastBlock();
  }
}
