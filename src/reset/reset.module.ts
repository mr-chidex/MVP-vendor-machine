import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResetService } from './reset.service';
import { ResetController } from './reset.controller';
import { User } from '../database/users.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [ResetService],
  controllers: [ResetController],
})
export class ResetModule {}
