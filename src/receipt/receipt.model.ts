import { Column, Entity, Index, OneToMany } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';

import { Product } from '../product/product.model';

@ObjectType()
@Index('receipt_pkey', ['id'], { unique: true })
@Entity('receipt', { schema: 'public' })
export class Receipt {
  @Field()
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Field()
  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt: Date;

  @Field()
  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt: Date;

  @Field(() => [Product])
  @OneToMany(() => Product, (product) => product.receipt)
  products: Product[];
}
