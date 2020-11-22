import { Injectable } from '@nestjs/common';
import bscrypt from 'bcrypt';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UserService) {}

  // TODO: don't use 'any' type
  async validateUser(username: string, passwordParam: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (!user) {
      return null;
    }

    const isPasswordMatching = await bscrypt.compare(
      user.password,
      passwordParam,
    );

    if (!isPasswordMatching) {
      return null;
    }

    const { password, ...result } = user;
    return result;
  }
}
