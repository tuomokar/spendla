import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Receipt } from './receipt.model';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectRepository(Receipt)
    private receiptRepository: Repository<Receipt>,
  ) {}

  findAll(): Promise<Receipt[]> {
    return this.receiptRepository.find();
  }

  findOne(id: string): Promise<Receipt> {
    return this.receiptRepository.findOne(id);
  }
}
