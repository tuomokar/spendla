import { Field, ObjectType } from '@nestjs/graphql';

export interface CreateUserDto {
  username: string;
  password: string;
  email: string;
}

@ObjectType()
export class UserDto {
  @Field()
  id: string;
  @Field()
  username: string;
  @Field()
  email: string;
  @Field()
  createdAt: Date;
  @Field()
  updatedAt: Date;
}
