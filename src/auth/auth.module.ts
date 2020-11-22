import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { TEMP_JWT_TOKEN_SECRET } from './temp-jwt-token-secret';

// todo: Bring a proper secret from a configuration service
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: TEMP_JWT_TOKEN_SECRET,
      signOptions: { expiresIn: '30s' }, // TODO: change this value
    }),
  ],
  providers: [AuthService, LocalStrategy],
  exports: [AuthService],
})
export class AuthModule {}
