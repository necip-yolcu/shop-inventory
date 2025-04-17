import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiParam } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    findAll() {
        return this.productService.findAll();
    }

    @Get('/catalog/:catalogId')
    @ApiParam({name: 'catalogId', type: Number})
    findProductsByCatalogId(@Param('catalogId') catalogId: number) {
        return this.productService.findByCatalog(Number(catalogId));
    }

    @Post()
    @ApiBody({type: CreateProductDto})
    create(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }

    @Delete(':id')
    @ApiParam({name: 'id', type: Number})
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(Number(id));
    }

    @Patch(':id/assign-catalog/:catalogId')
    @ApiParam({name: 'id', type: Number})
    @ApiParam({name: 'catalogId', type: Number})
    assignCatalogToProduct(@Param('id') id: number, @Param('catalogId') catalogId: number ) {
        return this.productService.assignCatalogToProduct(Number(id), Number(catalogId));
    }

    @Patch(':id/remove-catalog')
    @ApiParam({name: 'id', type: Number})
    removeCatalogFromProduct(@Param('id') id: number) {
        return this.productService.removeCatalogFromProduct(Number(id));
    }

}
