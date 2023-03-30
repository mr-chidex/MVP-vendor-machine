import { IsNotEmpty, IsIn, IsNumber } from 'class-validator';

const DEPOSIT_VALUE = [5, 10, 20, 50, 100];

export class BuyDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  amountOfProduct: number;
}
