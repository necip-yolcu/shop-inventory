import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Catalog } from './catalog.entity';
import { CreateCatalogDto } from './dto/create-catalog.dto';

@Injectable()
export class CatalogService {
    constructor(
        @InjectRepository(Catalog) 
        private readonly catalogRepository: Repository<Catalog>
    ) {}

    async findAll(): Promise<Catalog[]> {
        return await this.catalogRepository.find({ relations: ['products'] });
    }

    async create(catalog: CreateCatalogDto) {
        const newCatalog = this.catalogRepository.create(catalog);
        return await this.catalogRepository.save(newCatalog);
    }

    async remove(id: number) {
        return await this.catalogRepository.delete(id);
    }
}
