import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { ProductService } from './product.service';
import { ProductModel } from './product.model';

@Resolver(ProductModel)
export class ProductResolver {
  constructor(@Inject(ProductService) private productService: ProductService) {}

  @Query(() => ProductModel)
  async product(@Args('id') id: string): Promise<ProductModel> {
    return await this.productService.findOne(id);
  }

  @Query(() => [ProductModel])
  async products(): Promise<ProductModel[]> {
    return await this.productService.findAll();
  }

  @Mutation(() => ProductModel)
  async createProduct(@Args('name') name: string): Promise<ProductModel> {
    return await this.productService.create({ name });
  }
}
