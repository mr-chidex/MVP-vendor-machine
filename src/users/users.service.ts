import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { RegisterAuthDto, UpdateDto } from './dto';
import { User } from '../database/users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async signup(userCredentials: RegisterAuthDto) {
    const { username, password, role } = userCredentials;

    const userExist = await this.userRepository.findOneBy({ username });
    if (userExist) throw new BadRequestException('username already in use');

    const salt = await bcrypt.genSalt(12);
    const hashPass = await bcrypt.hash(password, salt);

    await this.userRepository
      .create({ username, password: hashPass, role })
      .save();
  }

  async getProfile(user: User) {
    return user;
  }

  async updateProfile(user: User, updateDetails: UpdateDto) {
    const { role } = updateDetails;

    user.role = role;
    await user.save();

    return user;
  }

  async deleteAccount(user: User) {
    await user.remove();

    return { message: 'account successfully deleted' };
  }
}
