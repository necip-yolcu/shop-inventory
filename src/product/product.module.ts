import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { CatalogModule } from 'src/catalog/catalog.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CatalogModule],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
