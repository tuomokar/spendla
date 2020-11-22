import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';

import { UserService } from './user.service';
import { UserAccount } from './user.model';
import { UserDto } from './user.dto';

@Resolver(UserAccount)
export class UserResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Mutation(() => UserDto)
  async registerUser(
    @Args('username') username: string,
    @Args('email') email: string,
    @Args('password') password: string,
  ): Promise<UserDto> {
    return await this.userService.create({
      username,
      email,
      password,
    });
  }
}
