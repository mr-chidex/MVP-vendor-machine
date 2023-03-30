import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  @IsNumber()
  amountAvailable: number;

  @IsNotEmpty()
  @IsNumber()
  cost: number;

  @IsNotEmpty()
  @IsString()
  productName: string;
}
