import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsIn,
} from 'class-validator';
import { ROLE } from '../../database/users.entity';

export class RegisterAuthDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  username: string;

  @IsNotEmpty()
  @MinLength(5)
  @MaxLength(20)
  password: string;

  @IsNotEmpty()
  @IsString()
  @IsIn([ROLE.BUYER, ROLE.SELLER])
  role: string;
}
