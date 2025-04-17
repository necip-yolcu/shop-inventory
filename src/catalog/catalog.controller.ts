import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CatalogService } from './catalog.service';
import { CreateCatalogDto } from './dto/create-catalog.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { UpdateCatalogDto } from './dto/update-catalog.dto';

@ApiTags('catalogs') 
@Controller('catalog')
export class CatalogController {
    constructor(private readonly catalogService: CatalogService) {}

    @Get()
    @ApiOperation({ summary: 'Get all catalogs with products' })
    findAll() {
        return this.catalogService.findAll();
    }

    @Post()
    @ApiOperation({ summary: 'Create a new catalog' })
    @ApiBody({ type: CreateCatalogDto })
    create(@Body() dto: CreateCatalogDto) {
        return this.catalogService.create(dto);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Update a catalog by ID' })
    @ApiParam({ name: 'id', type: Number })
    @ApiBody({ type: UpdateCatalogDto })
    update(@Param('id') id: number, @Body() dto: UpdateCatalogDto) {
        return this.catalogService.updateCatalog(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a catalog by ID' })
    @ApiParam({ name: 'id', type: Number })
    remove(@Param('id') id: number) {
        return this.catalogService.remove(Number(id));
    }
}
