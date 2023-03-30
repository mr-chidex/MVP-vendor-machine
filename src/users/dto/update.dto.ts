import { IsNotEmpty, IsString, IsIn } from 'class-validator';
import { ROLE } from '../../database/users.entity';

export class UpdateDto {
  @IsNotEmpty()
  @IsString()
  @IsIn([ROLE.BUYER, ROLE.SELLER])
  role: string;
}
