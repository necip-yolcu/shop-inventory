import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";


export class CreateCatalogDto {
    @ApiProperty({ example: 'Electronics' })
    @IsString()
    name: string;
}