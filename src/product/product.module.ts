import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { ProductModel } from './product.model';
import { ProductResolver } from './product.resolver';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature([ProductModel])],
  providers: [ProductService, ProductResolver],
  exports: [ProductService],
})
export class ProductModule {}
