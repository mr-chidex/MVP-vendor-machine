import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

import { LoginAuthDto } from './dto';
import { User } from '../database/users.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signin(loginCredentials: LoginAuthDto) {
    const user = await this.validateCredentials(loginCredentials);

    this.isUserActive(user);

    const payload = { username: user.username };
    const token = this.jwtService.sign(payload);

    user.token = token;
    await user.save();

    return { token };
  }

  async validateCredentials(loginCredentials: LoginAuthDto) {
    const { username, password } = loginCredentials;

    const user = await this.userRepository.findOneBy({ username });
    if (!user)
      throw new UnauthorizedException('username or password is incorrect');

    const isPassword = await bcrypt.compare(password, user.password);
    if (!isPassword)
      throw new UnauthorizedException('username or password is incorrect');

    return user;
  }

  isUserActive(user: User) {
    if (!user.token) return;

    //check if token is expired
    try {
      jwt.verify(user.token, process.env.JWT_SECRET) as {
        exp: number;
      };
    } catch (error) {
      if (error.message === 'jwt expired') return;

      throw new BadRequestException({
        message: error.message,
      });
    }

    // if token is not epxpired
    throw new ConflictException({
      token: user.token,
      message: 'There is already an active session using your account',
    });
  }

  async logout(user: User) {
    user.token = null;
    await user.save();

    return { message: 'logout successful' };
  }
}
