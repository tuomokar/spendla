import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './product.model';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  create(details: ProductDto): Promise<Product> {
    return this.productRepository.save(details);
  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<Product> {
    return this.productRepository.findOne(id);
  }
}
