import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('products')
@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) {}

    @Get()
    @ApiOperation({ summary: 'Retrieve all products' })
    findAll() {
        return this.productService.findAll();
    }

    @Get('/catalog/:catalogId')
    @ApiOperation({ summary: 'Retrieve products by catalog ID' })
    @ApiParam({name: 'catalogId', type: Number})
    findProductsByCatalogId(@Param('catalogId') catalogId: number) {
        return this.productService.findByCatalog(Number(catalogId));
    }

    @Post()
    @ApiOperation({ summary: 'Create a new product' })
    @ApiBody({type: CreateProductDto})
    create(@Body() dto: CreateProductDto) {
        return this.productService.createProduct(dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product by ID' })
    @ApiParam({name: 'id', type: Number})
    deleteProduct(@Param('id') id: number) {
        return this.productService.deleteProduct(Number(id));
    }

    @Patch(':id/assign-catalog/:catalogId')
    @ApiOperation({ summary: 'Assign a catalog to a product' })
    @ApiParam({name: 'id', type: Number})
    @ApiParam({name: 'catalogId', type: Number})
    assignCatalogToProduct(@Param('id') id: number, @Param('catalogId') catalogId: number ) {
        return this.productService.assignCatalogToProduct(Number(id), Number(catalogId));
    }

    @Patch(':id/remove-catalog')
    @ApiOperation({ summary: 'Remove catalog from a product' })
    @ApiParam({name: 'id', type: Number})
    removeCatalogFromProduct(@Param('id') id: number) {
        return this.productService.removeCatalogFromProduct(Number(id));
    }

}
