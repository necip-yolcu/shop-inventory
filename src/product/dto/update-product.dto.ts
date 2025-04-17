import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ example: 'Laptop', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 1000, required: false })
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty({ example: 1, required: false })
  @IsNumber()
  @IsOptional()
  catalogId?: number;
}