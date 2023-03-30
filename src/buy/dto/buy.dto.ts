import { IsNotEmpty, IsNumber } from 'class-validator';

export class BuyDto {
  @IsNotEmpty()
  @IsNumber()
  productId: number;

  @IsNotEmpty()
  @IsNumber()
  amountOfProduct: number;
}
