import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserAccount } from './user.model';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserAccount])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
