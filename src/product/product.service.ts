import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { ProductModel } from './product.model';
import { ProductDto } from './product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductModel)
    private productRepository: Repository<ProductModel>,
  ) {}

  create(details: ProductDto): Promise<ProductModel> {
    return this.productRepository.save(details);
  }

  findAll(): Promise<ProductModel[]> {
    return this.productRepository.find();
  }

  findOne(id: string): Promise<ProductModel> {
    return this.productRepository.findOne(id);
  }
}
