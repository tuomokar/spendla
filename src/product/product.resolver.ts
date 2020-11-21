import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { ProductService } from './product.service';
import { Product } from './product.model';

@Resolver(Product)
export class ProductResolver {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Query(() => Product)
  async product(@Args('id') id: string): Promise<Product> {
    return await this.productService.findOne(id);
  }

  @Query(() => [Product])
  async products(): Promise<Product[]> {
    return await this.productService.findAll();
  }

  @Mutation(() => Product)
  async createProduct(@Args('name') name: string): Promise<Product> {
    return await this.productService.create({ name });
  }
}
