import { Index, JoinColumn, ManyToOne, Entity, Column } from 'typeorm';
import { ObjectType, Field } from '@nestjs/graphql';
import { Receipt } from '../receipt/receipt.model';

@ObjectType()
@Index('product_pkey', ['id'], { unique: true })
@Entity('product', { schema: 'public' })
export class Product {
  @Field()
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Field()
  @Column('character varying', { name: 'name', length: 300 })
  name: string;

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

  @Field(() => Receipt)
  @ManyToOne(() => Receipt, (receipt) => receipt.products)
  @JoinColumn([{ name: 'receipt_id', referencedColumnName: 'id' }])
  receipt: Receipt;
}
