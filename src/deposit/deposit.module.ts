import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DepositService } from './deposit.service';
import { DepositController } from './deposit.controller';
import { User } from '../database/users.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  providers: [DepositService],
  controllers: [DepositController],
})
export class DepositModule {}
