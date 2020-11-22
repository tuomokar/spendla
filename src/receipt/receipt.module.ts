import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { Receipt } from './receipt.model';
import { ReceiptService } from './receipt.service';
import { ReceiptResolver } from './receipt.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt])],
  providers: [ReceiptService, ReceiptResolver],
  exports: [ReceiptService],
})
export class ReceiptModule {}
