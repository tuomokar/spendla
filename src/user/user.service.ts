import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserAccount } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserAccount)
    private userRepository: Repository<UserAccount>,
  ) {}

  async findOne(username: string): Promise<UserAccount | null> {
    return this.userRepository.findOne({ username }) ?? null;
  }
}
