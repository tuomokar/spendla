import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccount } from './user.model';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver'

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
