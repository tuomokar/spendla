import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { TEMP_JWT_TOKEN_SECRET } from './temp-jwt-token-secret';

interface UserJwtTokenObject {
  username: string;
  sub: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: TEMP_JWT_TOKEN_SECRET,
    });
  }

  async validate(payload: UserJwtTokenObject) {
    return { userId: payload.sub, username: payload.username };
  }
}
