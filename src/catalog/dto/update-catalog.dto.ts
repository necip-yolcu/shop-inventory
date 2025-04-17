import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCatalogDto {
  @ApiProperty({ example: 'Clothing', required: false })
  @IsString()
  @IsOptional()
  name?: string;
}