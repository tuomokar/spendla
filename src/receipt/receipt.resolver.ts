import { Resolver, Args, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { ReceiptService } from './receipt.service';
import { Receipt } from './receipt.model';

@Resolver(Receipt)
export class ReceiptResolver {
  constructor(@Inject(ReceiptService) private receiptService: ReceiptService) {}

  @Query(() => Receipt)
  async receipt(@Args('id') id: string): Promise<Receipt> {
    return await this.receiptService.findOne(id);
  }

  @Query(() => [Receipt])
  async receipts(): Promise<Receipt[]> {
    return await this.receiptService.findAll();
  }
}
