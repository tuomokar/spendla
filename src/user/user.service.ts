import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto, UserDto } from './user.dto';
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

  async create(details: CreateUserDto): Promise<UserDto> {
    // create the user entity first to ensure the model's BeforeInsert is run
    const user = Object.assign(new UserAccount(), details);
    const createdUser = await this.userRepository.save(user);

    const { password, ...userWithoutPassword } = createdUser;
    return userWithoutPassword;
  }
}
