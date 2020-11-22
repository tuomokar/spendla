import { Injectable } from '@nestjs/common';
import { compare } from 'bcrypt';

import { UserDto } from 'src/user/user.dto';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    username: string,
    passwordParam: string,
  ): Promise<UserDto> {
    const user = await this.userService.findOne(username);

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

  async login({ username, id }: UserDto) {
    const payload = { username, sub: id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
