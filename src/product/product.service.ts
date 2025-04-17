import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Catalog } from 'src/catalog/catalog.entity';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Catalog)
        private readonly catalogRepository: Repository<Catalog>
    ) {}

    async findAll(): Promise<Product[]> {
        return await this.productRepository.find({relations: ['catalog']});
    }

    async findByCatalog(catalogId: number) {
        return await this.productRepository.find({ 
            where: { catalog: { id: catalogId } },
            relations: ['catalog'] 
        });
    }

    async createProduct(dto: CreateProductDto): Promise<Product> {
        const catalog = await this.catalogRepository.findOne({ where: { id: dto.catalogId } });
        if (!catalog) {
            throw new HttpException('Catalog not found', HttpStatus.NOT_FOUND);
        }

        const product = this.productRepository.create({
            name: dto.name,
            price: dto.price,
            catalog: catalog
        });
        return await this.productRepository.save(product);
    }

    async updateProduct(id: number, dto: UpdateProductDto): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['catalog'] });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        if (dto.name) product.name = dto.name;
        if (dto.price) product.price = dto.price;
        if (dto.catalogId) {
            const catalog = await this.catalogRepository.findOne({ where: { id: dto.catalogId } });
            if (!catalog) {
                throw new HttpException('Catalog not found', HttpStatus.NOT_FOUND);
            }
            product.catalog = catalog;
        }
        return this.productRepository.save(product);
    }

    async deleteProduct(productId: number) {
        return this.productRepository.delete(productId);
    }

    async assignCatalogToProduct(id: number, catalogId: number) {
        const product = await this.productRepository.findOne({ where: { id }, relations: ['catalog'] });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }

        const catalog = await this.catalogRepository.findOne({ where: { id: catalogId } });
        if (!catalog) {
            throw new HttpException('Catalog not found', HttpStatus.NOT_FOUND);
        }

        product.catalog = catalog;
        return await this.productRepository.save(product);
    }

    async removeCatalogFromProduct(id: number): Promise<Product> {
        const product = await this.productRepository.findOne({ where: { id } });
        if (!product) {
            throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
        }
        product.catalog = null;
        return await this.productRepository.save(product);
    }
}
