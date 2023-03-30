import { IsNotEmpty, IsIn, IsNumber } from 'class-validator';

const DEPOSIT_VALUE = [5, 10, 20, 50, 100];

export class DepositDto {
  @IsNotEmpty()
  @IsNumber()
  @IsIn(DEPOSIT_VALUE)
  deposit: number;
}
