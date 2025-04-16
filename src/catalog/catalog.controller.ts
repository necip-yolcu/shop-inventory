import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get()
    findAll() {
        return this.catalogService.findAll();
    }

    @Post()
    create(@Body() dto: CreateCatalogDto) {
        return this.catalogService.create(dto);
    }

    @Delete(':id')
    remove(@Param('id') id: number) {
        return this.catalogService.remove(Number(id));
    }
}
