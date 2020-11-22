import { Field, ObjectType } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, Index, OneToMany } from 'typeorm';
import { hash } from 'bcrypt';

import { Receipt } from '../receipt/receipt.model';

@ObjectType()
@Index('user_account_pkey', ['id'], { unique: true })
@Entity('user_account', { schema: 'public' })
export class UserAccount {
  @Field()
  @Column('uuid', {
    primary: true,
    name: 'id',
    default: () => 'uuid_generate_v4()',
  })
  id: string;

  @Field()
  @Column('text', { name: 'username' })
  username: string;

  @Field()
  @Column('text', { name: 'password' })
  password: string;

  @Field()
  @Column('text', { name: 'email' })
  email: string;

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

  @Field(() => [Receipt])
  @OneToMany(() => Receipt, (receipt) => receipt.creator)
  receipts: Receipt[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 10);
  }
}
