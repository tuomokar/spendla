import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserDto } from 'src/user/user.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  async validateUser(
    username: string,
    passwordParam: string,
  ): Promise<UserDto> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const isPasswordMatching = await compare(passwordParam, user.password);

    if (!isPasswordMatching) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }
}
