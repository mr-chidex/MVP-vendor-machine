import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { JWTPaload } from './interface/jwt.interfaces';
import { User } from '../database/users.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        process.env.NODE_ENV === 'test'
          ? 'testsecretkey'
          : process.env.JWT_SECRET,
    });
  }

  async validate(payload: JWTPaload) {
    const { username } = payload;

    const user = await this.userRepository.findOneBy({ username });
    if (!user) throw new UnauthorizedException();

    if (!user.token)
      throw new UnauthorizedException(
        "Unauthorized: You don't have an active session, login to proceed",
      );

    return user;
  }
}
